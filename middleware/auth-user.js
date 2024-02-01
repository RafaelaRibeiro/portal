// auth-user.js

export default function ({ app, redirect, $auth }) {
  console.log('Middleware: Início da verificação de autenticação...')
  if ($auth.loggedIn) {
    console.log('Middleware: isAuthenticated? true')
    console.log('Middleware: Usuário autenticado. Permite acesso à página.')
    console.log('Estado de autenticação:', $auth.loggedIn)
  } else {
    console.log('Middleware: isAuthenticated? false')
    console.log(
      'Middleware: Usuário não autenticado. Redirecionando para /login...'
    )
    redirect('/login')
  }
  console.log('Middleware: Fim da verificação de autenticação.')
}
