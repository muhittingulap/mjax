<?php

// example kod her fonksiyon içinde kullanabilir ve her fonsiyon mjx i return olarak geri dönmeli.
/*
    $mjx = new \mjax();

    $mjx->alert('Ekrana Alert Bastırmak İçin'); // Ekrana Alert Bastırmak İçin
    $mjx->script('alert("Script kodlarını çalıştırmak için.");'); // Script kodlarını çalıştırmak için.
    $mjx->redirect('https://github.com/muhittingulap'); // bir linke direk yönlendirmek için kendi local linkinden olabilir..
    $mjx->assign('#info', 'html', $html); // bir dom elementine html veya başka bir özelliğine işlem yapaaiblirsin.


    return $mjx;

*/

function test($data = array())
{
    $mjx = new \mjax();

    $mjx->alert($data["param1"] . ' : ' . $data["inputValue"]);

    return $mjx;
}

function login($data = array())
{
    $mjx = new \mjax();

    if (!$data["email"] || !$data["password"]) {
        $mjx->script('swal("Uyarı !","Lütfen Boş Alan Bırakmayın !","warning");');
        return $mjx;
    }

    // eğer sorun yoksa devam eder ve diğer işlermleri yapabilirsin.

    $html = "<div class='row'>
                <div class='col'>
                    <label>Email</label>
                    <div>" . $data["email"] . "</div>
                </div>
                 <div class='col'>
                    <label>Password</label>
                    <div>" . $data["password"] . "</div>
                </div>
            </div>";

    $mjx->assign('#info', 'html', $html);

    return $mjx;

}
