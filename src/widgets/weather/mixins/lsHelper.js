export default{
    data(){
        return{
            store: null,
        }
    },
    methods: {
        getLSData(){
            return JSON.parse(window[this.store].getItem('weather')) ? JSON.parse(window[this.store].getItem('weather')) : {};
        },
        setLSData(obj){
            window[this.store].setItem('weather', JSON.stringify(obj));
        },
    },
    created() {
        const test = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.store = test ? 'sessionStorage' : 'localStorage'
    }
}
