$(function(){

    $('#btn-registrar').click(function(event){
        event.preventDefault();
        let marca= $('#select-marca').val();
        let memoriaRam= $('#txt-ram').val();
        let almacenamiento=$('#txt-almacenamiento').val();

        axios.post('/procesar', {
            marca , memoriaRam, almacenamiento
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    })
    
    
})