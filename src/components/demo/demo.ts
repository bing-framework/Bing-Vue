import Vue from 'vue'
//import Component from 'vue-class-component'
import { Prop,Component } from 'vue-property-decorator'

@Component({ name: 'bi-demo', props: ['list', 'title'] })
export class BiDemo extends Vue {
    @Prop({ required: true })
    list: any

    protected created() {
        console.log('测试一下Demo')        
    }
}