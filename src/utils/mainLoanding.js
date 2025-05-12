class MainLoanding{

    initMainLoanding( id ){
        setTimeout(() => {
            document.getElementById(id).style.display = 'none';
          }, 10000);
    }

}

export default new MainLoanding();
