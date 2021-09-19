$(document).ready(function (){
    home();
    $('#home').click(function(){
        home()
    })

    $('#about').click(function(){
        about()
    })

    $('#contact').click(function(){
        contact()
    })
});

function home () {
    $('section').load('views/home.html');
};

function about () {
    $('section').html(`
        <h1>About my website</h1>
        <p>Here you should see extra info</p>
    `);
};

function contact() {
    $('section').load('views/contact.html', function(){
        $('#btnContact').click(function(){
            let name = $('#name').val();
            let email = $('#email').val();
            let pwd = $('#pwd').val();
            let cep = $('#cep').val();
            
            getLocal(cep, function(local){
                let contact = new Contact(name, email, cep, pwd, local);
                $('section').load('views/contactView.html', function(){
                    $('#name').html(contact.name)
                    $('#email').html(contact.email);
                    $('#pwd').html(contact.pwd);
                    $('#cep').html(contact.local)
                });

            });
        });
    });
} ;

class Contact{
    constructor(_name, _email, _cep, _pwd, _local){
        this.name = _name;
        this.email = _email;
        this.pwd = _pwd;
        this.cep = _cep;
        this.local = _local;
    }
}

function getLocal(cep, callBack){
    $.getJSON('http://viacep.com.br/ws/'+cep+'/json', function(data){
        console.log(data.localidade);
        return callBack(data.localidade)
    });
}