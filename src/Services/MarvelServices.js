
class MarvelService {
    _apiBase='https://gateway.marvel.com:443/v1/public/';
    _apiKey='apikey=d153d1c59f1b09a6e4b0e2b88dedf232';
    _baseOffset=210;
    getResources = async (url)=>{
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Couldnt fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters=async (offset=this._baseOffset)=>{
        const res=await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter=async (id)=>{
        const res =  await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter=(char)=>{


        return{
            name:char.name,
            description:    char.description? `${char.description.slice(0,100)}...`:'Описание остутствует',
            thumbnail:char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
            id:char.id,
            comics:char.comics.items
        }
    }

}

export default MarvelService;