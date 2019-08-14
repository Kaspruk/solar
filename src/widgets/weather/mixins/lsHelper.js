export default{
    methods: {
        getLSData(){
            return JSON.parse(localStorage.getItem('weather')) ? JSON.parse(localStorage.getItem('weather')) : {};
        },
        setLSData(obj){
            localStorage.setItem('weather', JSON.stringify(obj));
        },
    },
}
