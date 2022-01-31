import React,{useState,useEffect} from 'react'
import Web3 from 'web3';

export const Navbar = () => {
    const[dateTime,setDateTime]=useState('');
    const[selectedAccount,setSelectedAccount]=useState('');
    const[click,setClick]=useState(false);
    useEffect(async() => {
        var date = new Date().toDateString();
        setDateTime(date)
         
       }, []);
       //for connecting metamask
        const connectTometamask = async () => {
        let provider = window.ethereum;
    
        if (typeof provider !== 'undefined') {
            provider
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    setSelectedAccount(accounts[0]);
                    setClick(true);
                    console.log(`Selected account is ${selectedAccount}`);
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
    
        const web3 = new Web3(provider);
    
        const networkId = await web3.eth.net.getId();
        console.log(networkId);   
    }   
    return (
        <div class='navbaar'>
            <div>
                <div className='dateTime'>
                {click? (<h4 className='metamaskId' style={{color:"red",font:'14px',background:"white"}}>AccountAddress: {selectedAccount}</h4>):
                <button className='connectBtn' style={{color:'white',background:'black'}} onClick={()=>connectTometamask()}
                >connect to metamask</button>}
                    <h3>{dateTime}</h3>
                </div>
                
            </div>
        </div>
    )
}