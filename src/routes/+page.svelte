<script>
    import { connectWallet, createListing } from "./web3.js";
    import { onMount } from 'svelte';

    onMount(async ()=>{
        connectWallet();    
    });

    const price = "1.0"; // in ETH
    const title = "Sample Item";
    const description = "This is a description of the item.";
    const image = "https://example.com/image.png";

    const handleListing = ()=>{
        createListing(price, title, description, image);
    }

</script>

<button on:click={handleListing}>Create Listing</button>