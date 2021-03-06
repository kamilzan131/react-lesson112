import {Component} from 'react';
import './charList.scss';
import MarvelService from "../../Services/MarvelServices";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from 'prop-types';

class CharList extends Component{

    state={
        charList:[],
        loading:true,
        error: false,
        newItemLoading:false,
        offset:1544,
        charEnded:true
    }
    marvelService = new MarvelService();

    componentDidMount() {
       this.onRequest();
    }

    onRequest=(offset)=>{
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading=()=>{
        this.setState({
            newItemLoading:true
        })
    }

    onCharListLoaded=(newCharList)=>{
        let ended = false;
        if(newCharList.length<9){
            ended=true
        }
            this.setState(({offset,charList})=>({
                charList:[...charList,...newCharList],
                loading:false,
                newItemLoading:false,
                offset:offset+9,
                charEnded:ended
            }))
    }

    onError=()=>{
        this.setState({
            loading:false,
            error:true
        })
    }
    itemRefs=[];
    setRef = (ref)=>{
        this.itemRefs.push(ref);
    }
    focusOnItem=(id)=>{
        this.itemRefs.forEach(item=>{
            item.classList.remove('char__item_selected');
        })
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }


    renderItem=(array)=>{



        const items=array.map((item,i)=>{

            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }


            return(
                <li
                    className='char__item'
                    key={item.id}
                    ref={this.setRef}
                    onClick={()=>{this.props.onCharSelected(item.id);this.focusOnItem(i)}}
                    onKeyPress={(e)=>{
                        if(e.key===''||e.key==='Enter'){
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }}
                    tabIndex='0'>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )

        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    render(){

        const {charList,loading,error,offset,newItemLoading,charEnded}=this.state;
        const errorMessage= error?<ErrorMessage/>:null;
        const spinner = loading?<Spinner/>:null;

        const items=this.renderItem(charList);
        const content = !(error||loading)?items:null;


        return (
            <div className="char__list">

                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display:charEnded?'none':'block' }}
                    onClick={()=>this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}
CharList.propTypes={
    onCharSelected:PropTypes.func.isRequired
}
export default CharList;