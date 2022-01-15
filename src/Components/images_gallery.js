
import React,{Component} from 'react';
import './gallery.css';
import InfiniteScroll from "react-infinite-scroll-component";

class ImageResults extends Component{
constructor(props) {
    super(props);
    this.state = {

      imageModel:false,
       tempimgSrc:'',
     };
   this.getImg = this.getImg.bind(this);
   }
//method to get the source of image and show it on whole page
 getImg(srcPath){
    
    this.setState({imageModel:true, tempimgSrc:srcPath});
    
}
  render(){
  
return(
  <>
   <div className={this.state.imageModel ? "model open":"model"}>
      <img src = {this.state.tempimgSrc} />
      <button className="close" onClick={()=>{this.setState({imageModel:false})}}>&times;</button>
  </div>
   {
   //infinite scroll component to load images when reaching end of page
   }
      <InfiniteScroll
          dataLength={this.props.imgDataArr.length}
          next={this.props.fetchMoreData}
          hasMore={this.props.imgDataArr.length !== this.props.totalResults}
          loader={<h4>Loading...</h4>}
        >
          
    
    <div className="gallery">
     {this.props.imgDataArr.map((imageObj,index)=>{
       var srcPath = `https://farm${imageObj.farm}.staticflickr.com/${imageObj.server}/${imageObj.id}_${imageObj.secret}.jpg`;
       return (
         <div className="pics" key={index} onClick={()=>{this.getImg(srcPath);}}> 
           <img alt="image" src = {srcPath} style={{width:'100%'}}/>
         </div>
      )
     })}
    </div>
    
    
        </InfiniteScroll>
    </>
);
}}


export default ImageResults;