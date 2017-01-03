import {Injectable} from "@angular/core";
@Injectable()
export class NavService {
    navList:any;
    constructor(){
        this.navList=document.getElementById("appNavList");
    }

    changeNavSelection(navName){
        for(let i=0,len=this.navList.children.length;i<len;i++){
            let child=this.navList.children[i];
            let link=child.children[0];
            if(link.innerHTML===navName){
                child.setAttribute("id","selectedNavLink");
            }else {
                child.setAttribute("id","");
            }
        }
    }

}
