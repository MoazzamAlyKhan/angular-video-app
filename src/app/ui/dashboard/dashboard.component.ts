import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../core/item.service';
import { Item } from '../../models/item';
import { VimeoService } from '../../core/vimeo.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { EmbedVideoService } from 'ngx-embed-video';
import { Observable } from '@firebase/util/dist/esm/src/subscribe';
import { NotifyService } from '../../core/notify.service';
import { RequestOptionsArgs, RequestOptions } from '@angular/http';

import { HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { VimeoUpload } from 'vimeo-upload';

import { HttpHeaderResponse } from '@angular/common/http/src/response';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  

  

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
  upl_disable: boolean = true; // upload button disabled before getting upload_data from vimeo
  init_pull: boolean = false;

  form_rec: any;

  

  readonly ROOT_URL = 'https://api.vimeo.com';


  constructor(  private http: HttpClient,
                private itemService: ItemService, 
                private vimService: VimeoService, 
                private embedService: EmbedVideoService,
                private notify: NotifyService,
               
              )
                

                {
                  this.itemService.getItems().subscribe(items => {
                    console.log(items);
                    this.items = items;
                  });

                  this.vimService.getPosts().subscribe(
                    res => console.log(res)
                  );

                  
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
            this.upl_disable = false;
        
       
            }
          
         },
         (error) => {
          this.handleError(error);
         }

         
      );
    }

  

    // main function for recieving file and uploading it to vimeo

    fileChange(event) {
      this.init_pull = true;
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
          console.log(file)
          let formData:FormData = new FormData();
          formData.append('file_data', file);
         
         
        
          const req = new HttpRequest('POST', this.upload_link, formData, {
            reportProgress:true,
            responseType: 'text'});

        
          
            this.http.request(req).subscribe(event => {
              // Via this API, you get access to the raw event stream.
              // Look for upload progress events.
              if (event.type === HttpEventType.UploadProgress) {
                // This is an upload progress event. Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% uploaded.`);
                this.notify.update('File Upload Progress:   ' + percentDone + '/100%', 'info');
              } else if (event instanceof HttpResponse) {
                this.notify.update('File Uploaded Successfully!', 'success');
                this.upl_disable = true;
                this.init_pull = false;
                this.vimService.getPosts().subscribe(
                    
                       (value) => {
                        
                        this.v_link = value.data[0].link;
                        this.item.title = 'Video';
                        this.item.link = this.v_link;
                        this.itemService.addItem(this.item);
                        this.item.title = '';
                        this.item.link = '';
                       
            
                       },
                       (error) => {
                        this.handleError(error)
                      }
                     );
                     


                
              }
            });
        
        }
      }
          
    
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

      
    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      this.notify.update(error.message, 'error');
    }




      
  }
  

