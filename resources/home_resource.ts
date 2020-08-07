import { Drash } from "../deps.ts";
import { Fibonacci, Pi }  from "../utils.ts"


export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"]; 

  public GET() {
    this.server.logger.info('Request GET sent')
    let params = this.request.getUrlQueryParams()
    if (Object.keys(params).length<1) {
      throw new Drash.Exceptions.HttpException(400, 'No parameters sent')
    }
    let data: any = {};
    Object.keys(params).map((key)=>{
      switch(key){
        default:
          data = {};
        case 'fibonacci':
          const input_fibo = parseInt(params[key])
          data[key] = Fibonacci(input_fibo)
          break
        case 'pi':
          const input_pi = parseInt(params[key]);
          data[key] = Pi(input_pi)
          break
      }
      
    })
    
    this.response.body = data
    this.response.status_code = 200
    return this.response;
  }

  // public POST() {
  //   this.response.body = JSON.stringify({ message: "Not implemented" });
  //   return this.response;
  // }

  // public DELETE() {
  //   this.response.body = JSON.stringify({ message: "Not implemented" });
  //   return this.response;
  // }

  // public PUT() {
  //   this.response.body = JSON.stringify({ message: "Not implemented" });
  //   return this.response;
  // }
}
