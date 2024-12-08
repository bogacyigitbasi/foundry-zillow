import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';

// home component expects some params that need to be given by the App.js
const Home = ({ home, provider, escrow, toggleProp }) => {

    const [buyer, setBuyer] = useState(null)
    const [seller, setSeller] = useState(null)
    const [lender, setLender] = useState(null)
    const [inspector, setInspector] = useState(null)

    // owner after purchase
    const [owner, setOwner] = useState(null)

    // check if all parties agreed on the state
    const [hasBought, setHasBought] = useState(false)
    const [hasLended, setHasLended] = useState(false)
    const [hasInspected, setHasInspected] = useState(false)
    const [hasSold, setHasSold] = useState(false)

    const fetchDetails = async() => {
        // get the buyer address from the escrow smart contract which is provided as prop
        // save it to a useState
        const buyer = await escrow.buyer(home.id)
        setBuyer(buyer)
        // checking the contract state to see if he/she approved
        const hasBought = await escrow.approval(home.id, buyer)
        setHasBoughtt(hasBought)

        // same will applies for other roles, seller lender and inspector
        const seller = await escrow.seller()
        setSeller(seller)
        // checking the contract state to see if he/she approved
        const hasSold = await escrow.approval(home.id, seller)
        setHasSold(hasSold)

        // lender
        const lender = await escrow.lender()
        setLender(lender)
        // checking the contract state to see if he/she approved
        const hasLended = await escrow.approval(home.id, lender)
        setHasLended(hasLended)

        // inspector
        const inspector = await escrow.inspector()
        setInspector(inspector)
        // checking the contract state to see if he/she approved
        const hasInspected = await escrow.approval(home.id, inspector)
        setHasInspected(hasInspected)

    }

    const fetchOwner = async() => {
        if (await escrow.isListed(home.id)) return

        const owner = await escrow.buyer(home.id)
        setOwner(owner)
    }

    useEffect(() =>{
        fetchDetails()
        fetchOwner()
    },[hasSold]) // if hasSold value changes, it will recall these functions on useEffect
    return (
        <div className="home">
            <div className='home'>
                <div className='home__details'>
                    <div className='home__image'>
                        <img src={home.image} alt='Home'/>
                    </div>
                    <div className='home__overview'>
                        <h1>{home.className} </h1>
                        <p>
                    <strong>{home.attributes[2].value}</strong> bds |
                    <strong>{home.attributes[3].value}</strong> ba |
                    <strong>{home.attributes[4].value}</strong> sqft |
                  </p>
                  <p>{home.address}</p>
                  <h2>{home.attributes[0].value} ETH</h2>

                  <div>
                    <button className='home__buy'>
                        Buy
                    </button>
                    <button className='home__contact'>
                        Contact Agent
                    </button>
                    <hr/>
                    <p>
                        {home.description}
                    </p>
                    <hr/>
                    <h2>Facts and Features</h2>
                    <ul>
                        {home.attributes.map((attribute, index) => (
                            <li key={index}> <strong>{attribute.trait_type}</strong> : {attribute.value} </li>
                        ))}
                    </ul>
                  </div>
                </div>
                    <button onClick={toggleProp} className='home__close'>
                         <img src={close} alt='Close'></img>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Home;
