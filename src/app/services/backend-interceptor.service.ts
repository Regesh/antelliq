import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { HttpInterceptor, HttpHandler, HttpRequest,  HttpEvent, HttpResponse} from '@angular/common/http';
import { of } from 'rxjs';
import { CowDataService } from "./cow-data.serivce";

   @Injectable()
   export class BackendInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private cowDataService: CowDataService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        switch(request.method) {
            case 'GET':
                if (request.url === "/cowData") {
                    return of(new HttpResponse({ status: 200, body: this.cowDataService.data }));
                }
            case 'PUT':
                if (request.url === "/cowData") {
                    this.cowDataService.data.result.map(item => {
                        if (item.cowId === request.body.cowId) {
                            item = request.body;
                        }
                        return item;
                    });
                    return of(new HttpResponse({status: 200}));
				}
				case 'POST':
					if (request.url === "/deleteCowData") {
						const deletedIndex = this.cowDataService.data.result.findIndex(item => item === request.body);
						this.cowDataService.data.result.splice(deletedIndex, 1);
						return of(new HttpResponse({status: 200, body: this.cowDataService.data}));
					}
					if (request.url === "/addCowData") {
						this.cowDataService.data.result.unshift(request.body);
						return of(new HttpResponse({status: 200, body: this.cowDataService.data}));;
					}
        }
        next.handle(request)
    }
   }