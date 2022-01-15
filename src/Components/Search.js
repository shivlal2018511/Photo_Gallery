import React from 'react';
import './Search.css';
import ImageResults from './images_gallery';
//import './gallery.css';

class SearchImg extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imgDataArr:[],
            searchText:'',
             imageModel:false,
            tempimgSrc:'',
            page:1,
            totalResults:0,
            loading:true
                };
              
 this.handleChange = this.handleChange.bind(this);
 
    }
    componentDidMount(){
        this.ReloadImages();
    }

    //to get data from api
      ReloadImages =()=>{
       const BASE_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=${this.state.searchText}&media=photos&per_page=12&page=${this.state.page}&format=json&nojsoncallback=1`;
    
    
          fetch(BASE_URL)
          .then((res) => res.json())
                          .then(data => {
                                 let imgArray = data.photos.photo;
                                this.setState({imgDataArr : imgArray, 
                                                totalResults:data.totalResults,
                                            loading:false
                                        }); 
                              
                           }).catch(err => console.log(err));
            
    }
   // function to delay reloading of component until user stops typing
    Delay = (function(){
        let timer=0;
        return (function(callback,ms){
            clearTimeout(timer);
         timer = setTimeout(callback,ms);
        });
    })();

    // method to load more images when reaching end of page
   fetchMoreData=()=>{
       this.setState({page:this.state.page +1});
         const BASE_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e52a287d86469bf01ea901dfd92cf8a5&text=${this.state.searchText}&media=photos&per_page=12&page=${this.state.page}&format=json&nojsoncallback=1`;
     console.log(BASE_URL);
     this.setState({loading:true});
          fetch(BASE_URL)
          .then((res) => res.json())
                          .then(data => {
                                 let imgArray = data.photos.photo;
                                this.setState({imgDataArr : this.state.imgDataArr.concat(imgArray), 
                                                totalResults:data.totalResults,
                                            loading:false}); 
                              
                           }).catch(err => console.log(err));
            
   }
   handleChange(e){
       this.setState({searchText:e.target.value});
   }
    render(){
return(
    <>
    <div className="searchInput">
       
        <input type="text" placeholder="Search free high resolution photos" name="searchText" value ={this.state.searchText}
         onChange={this.handleChange} 
         onKeyUp={()=>{this.Delay(function(){this.ReloadImages();}.bind(this),1000)}}/>      
         
    </div>
    <div>
        <ImageResults imgDataArr={this.state.imgDataArr} 
        totalResults={this.state.totalResults} 
        fetchMoreData={()=>this.fetchMoreData()}/>
    </div>
    
    </>
);

}}
export default SearchImg;