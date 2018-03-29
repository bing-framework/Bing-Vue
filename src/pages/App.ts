import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    components:{        
    }
})
export class App extends Vue {
    list:string[]=[]

    protected created() {
        for(let i=0;i<100;i++){
            this.list.push('双击666:'+i)
        }
        
    }
}