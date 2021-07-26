import Axios from './axios'

class NotaService{
    #recurso = 'nota'

    constructor(httpClient){
        this.httpClient = httpClient
    }

    list(){
        return this.httpClient.get(this.#recurso)
    }

    create(nota){
        return this.httpClient.post(this.#recurso, nota)
    }

    remove(_id){
        return this.httpClient.delete(`${this.#recurso}/${_id}`)
    }

}

export default new NotaService(Axios)