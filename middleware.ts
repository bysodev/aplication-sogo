import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {jwtVerify} from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  try {
    const jwt = request.cookies.get("token");
    const auth = request.cookies.get("auth");


    if(!jwt) return NextResponse.redirect(new URL("/login", request.url));    

    const key = new TextEncoder().encode( process.env.SECRET_KEY )
    const jwtString = JSON.stringify(jwt);
    const value = jwt.value;
    const dato= await jwtVerify(value, key);
    // jwtVerify(jwtString, key).then(result => console.log(result)).catch(ex=>console.log(ex)) ;
    console.log(dato)

    if( dato.payload.exp ){
      console.log(new Date())
      console.log( new Date( dato.payload.exp * 1000 )) // formato: 2023-07-24T15:45:48.000Z
      if( new Date() >   new Date( dato.payload.exp * 1000 )){
        console.log('SALTE')
      }else{
        console.log('ENTRASTE')

      }
      console.log( new Date( dato.payload.exp * 1000 )) // formato: 2023-07-24T15:45:48.000Z
    }

    // console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    // console.log( request.url )
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/learn/numeros'],
}