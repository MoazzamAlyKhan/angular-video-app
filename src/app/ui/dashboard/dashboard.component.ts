import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../core/item.service';
import { Item } from '../../models/item';
import { VimeoService } from '../../core/vimeo.service';
import { HttpClient } from '@angular/common/http';
import { EmbedVideoService } from 'ngx-embed-video';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { NotifyService } from '../../core/notify.service';
import { RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { VimeoUpload } from 'vimeo-upload';
import { DomSanitizer } from '@angular/platform-browser';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trustedUrl: any;
  

  

  items: Item[];
  item: Item = {
    title: '',
    link: ''
  }; // item variable for adding items
  v_link: string; // link of the uploaded video
  f_name: string; // filename of the uploaded file
  iframe_html: any;
  vimeoUrl = "";
  Name:string; 
  myFile:File; /* property of File type */
  upload_link: string; // link used to query vimeo api
  btn_disable: boolean = true;
  pull_upload: boolean = false;
  filesToUpload: Array<File>;
  form_rec: any;

  

  readonly ROOT_URL = 'https://api.vimeo.com';


  constructor(  private http: HttpClient,
                private itemService: ItemService, 
                private vimService: VimeoService, 
                private embedService: EmbedVideoService,
                private notify: NotifyService,
                private router: Router,
                private sanitizer: DomSanitizer )
                

                {
                  this.itemService.getItems().subscribe(items => {
                    console.log(items);
                    this.items = items;
                  });

                  
                }

  ngOnInit() {

    // get items from firbase database and display the list
  
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
    });

    
  }



  

  initiatePull(){

    this.vimService.createPosts().subscribe(
      
         (res) => {
          
          if(res){
            this.notify.update('Request Successful! You can upload your video.','success');
            this.upload_link = res.body.upload_link;
            
            this.form_rec = res.body.form;
            console.log(this.form_rec)
            this.trustedUrl = this.sanitizer.bypassSecurityTrustHtml(this.form_rec);
       
            }
          
         },
         (error) => {
          this.handleError(error);
         }

         
      );
    }

  
    // Getting the video file from the html uploader
    fileChange(files: any){ 

      this.myFile = files[0].nativeElement;
      // console.log(files[0]);
      this.f_name = files[0].name;

    }

    




   


    // On submitting the video file to the server
    // THIS IS CURRENTLY DISABLED BECAUSE STD HTML FORM IS BEING USED
    // INSTEAD OF ANGULAR FORM
    onSubmit(): void {
      
            let formData = new FormData();
            formData.append("MyFile", this.myFile);
            console.log(formData);

            const req = new HttpRequest('POST', this.upload_link, formData, {reportProgress:true});
            this.http.request(req).subscribe(res=> console.log(res));
        
            this.http.post(this.upload_link, formData,{
              observe: 'response',
              responseType: 'text',
              headers: new HttpHeaders().set('Content-Type','multipart/form-data') 
            }).subscribe(
              (res) => {
                
                if(res){

                  console.log(res);
                  
                  this.vimService.getPosts().subscribe(
                    
                       (value) => {
                        
                        this.v_link = value.data[0].link;
                        this.item.title = this.f_name;
                        this.item.link = this.v_link;
                        this.itemService.addItem(this.item);
                        this.item.title = '';
                        this.item.link = '';
                        this.btn_disable = true;
  
                       },
                       (error) => {
                        this.handleError(error)
                      }
                     );
                  
                  
                  
                }
                
               },
               (error) => {
                this.handleError(error)
               });
            
        }

        // play video function accessable through clicks 
    playVideo(event, item){

      console.log(item.link);
      this.iframe_html = this.embedService.embed(item.link, {attr: { width: 640, height: 480 }}); 
      $('#myModal').modal('toggle');
      
    }

    // hide modal and stop video from playing as modal closes
    playModal(){
      $('#myModal').on('hidden.bs.modal', function (e) {
        $('#myModal iframe').removeAttr('src');
      })
      }


      // pull uploaded video and store into firebase database
      
    pullUploadedV(){

      this.vimService.getPosts().subscribe(
        
           (value) => {
            
            this.v_link = value.data[0].link;
            this.item.title = 'Video';
            this.item.link = this.v_link;
            this.itemService.addItem(this.item);
            this.item.title = '';
            this.item.link = '';
            this.btn_disable = true;

           },
           (error) => {
            this.handleError(error)
          }
         );
         this.pull_upload = true;

    }

    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      this.notify.update(error.message, 'error');
    }




      
  }
  

