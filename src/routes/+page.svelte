<script>
    import { connectWallet, createListing, getAllListings } from "./web3.js";
    import { onMount } from 'svelte';

    onMount(async ()=>{
        connectWallet();    
    });

    let price;
    let title;
    let description;
    let image;
    
    let listings = [];

    const handleCreateListing = async () => {
    try {
      const tx = await createListing(price, title, description, image);
      console.log('Transaction:', tx);
      await fetchListings();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const fetchListings = async () => {
    try {
      listings = await getAllListings();
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };
  fetchListings();

</script>

<!-- <div class="card">
    <img src={image} alt={title} class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
    </div>
</div> -->

<div class="card" id="create">
    <div class="card-body">
        <input type="text" class="form-control" placeholder="Title" bind:value={title}>
        <input type="text" class="form-control" placeholder="Description" bind:value={description}>
        <label for="price">Price: </label>
        <input type="number" class="form-control" id="price" bind:value={price}>
        <input type="text" class="form-control" placeholder="Image URL" bind:value={image}>

        <button on:click={handleCreateListing}>Create Listing</button>
    </div>
</div>
