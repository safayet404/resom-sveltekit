const o="https://api-beta.resom.com.br/graphql/",l="channel-pln",d="http://localhost:5173/",p=o,h=l;async function m(i,c){var r,t,a,s,n;const e=await(await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
        mutation Register($email: String!, $password: String!, $redirectUrl: String!, $channel: String!) {
          accountRegister(input: {
            email: $email,
            password: $password,
            redirectUrl: $redirectUrl,
            channel: $channel
          }) {
            errors {
              field
              message
              code
            }
            user {
              id
              email
            }
          }
        }
      `,variables:{email:i,password:c,redirectUrl:`${d}confirm-email`,channel:h}})})).json();return{data:(r=e==null?void 0:e.data)==null?void 0:r.accountRegister,error:((t=e==null?void 0:e.errors)==null?void 0:t[0])||((n=(s=(a=e==null?void 0:e.data)==null?void 0:a.accountRegister)==null?void 0:s.errors)==null?void 0:n[0])}}export{l as P,d as a,m as r,p as s};
