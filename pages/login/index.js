import { signIn } from "next-auth/react";
import { useRef } from "react";

function Home() {
    const userName = useRef("");
    const pass = useRef("");
    
    const onSubmit = async(e) => {
        e.preventDefault();
        console.log("into onsubmit function");
        const result = await signIn("credentials", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl:"/"
        })
    }

    return (
      <>
        <div className="create">
          <h2 style={{ marginTop: "25px" }}></h2>
          <form>
            <label>UserName</label>
            <input type="text" onChange={(e) => (userName.current = e.target.value)} />
            <label>Password</label>
            <input type="text" onChange={(e) => (pass.current = e.target.value)} />
            <button onClick={onSubmit}>Submit</button>
          </form>
        </div>
      </>
    );
  }
  export default Home;