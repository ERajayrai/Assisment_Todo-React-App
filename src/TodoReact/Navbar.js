import React,{useState,useEffect} from 'react'
import Web3 from 'web3';

export const Navbar = () => {
    const[dateTime,setDateTime]=useState('');
    const[selectedAccount,setSelectedAccount]=useState('');
    const[click,setClick]=useState(false);
    const [balanceOf,setBalanceOf]=useState('-');
    useEffect(async() => {
        var date = new Date().toDateString();
        setDateTime(date)
         
    }, []);
       //for connecting metamask
        const connectTometamask = async () => {
        let provider = window.ethereum;
    
        let acccc;
        if (typeof provider !== 'undefined') {
            provider
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    setSelectedAccount(accounts[0]);
                    acccc=accounts[0]
                    setClick(true);
                    console.log(`Selected account is `+{selectedAccount});
                    console.log(selectedAccount+"abx");
                    const web3 = new Web3(provider);
                    console.log(acccc);
                     web3.eth.getBalance(acccc).then(res=>{
                        setBalanceOf(res);
                    }) 
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
    
            window.ethereum.on('accountsChanged', function (accounts) {
                setSelectedAccount(accounts[0]);
                setClick(true);
                console.log(`Selected account changed to ${selectedAccount}`);
            });
           
        }
        
    
        console.log(selectedAccount+"abx");
        const web3 = new Web3(provider);
    
        //const blnc=await web3.eth.getBalance(selectedAccount.toString()).then(res=>{
            //setBalanceOf(res);
        //}) 
        
    }   
    return (
        <div class='navbaar'>
            <div>
                <div className='dateTime'>
                {click? (<h4 className='metamaskId' style={{color:"red",font:'14px',background:"white"}}>AccountAddress: {selectedAccount}=Balance:{balanceOf}:sol</h4>):
                <button className='connectBtn' style={{color:'white',background:'black'}} onClick={()=>connectTometamask()}
                >connect to metamask</button>}
                    <h3>{dateTime}</h3>
                </div>
                
            </div>
        </div>
    )
}