import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/map';


@Injectable()
export class VimeoService {

  readonly ROOT_URL = 'https://api.vimeo.com';
  
  posts: Observable<any>;
  newPosts: Observable<any>;
  patchPost: Observable<any>;
  superPost;
  hyperPost: String;

  
  /* When we select file */
  Name:string; 
  myFile:File; /* property of File type */


  constructor(private http: HttpClient) { }

  fileChange(files: any){

    console.log(files);
    this.myFile = files[0].nativeElement;
  }

  getPosts(): Observable<any> {
    
    return this.http.get(this.ROOT_URL + '/users/73769702/videos',  {
      
    observe: 'body',
    responseType: 'json',
    headers: {
      'Content-Type':'application/json',
      'Authorization':'Bearer d821f7f30666fea902bde63c1d0ce475',
   
    }});
    
 
  }




  
  createPosts(): Observable<any>{
    const data = {
          'upload' :{
                      "approach" : "POST",
                      'redirect_url' : 'https://www.google.com'
                    }
          }
    
    return this.http.post(this.ROOT_URL + '/users/73769702/videos', data, {

        observe: 'response',
        responseType: 'json',   
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer d821f7f30666fea902bde63c1d0ce475',
        }});
          
    } // End Create Post


 

}
