const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
// Endpoint to handle POST request from the form
app.delete('/store/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  let storesData = [];
  try {
    const data = fs.readFileSync('stores.json', 'utf8');
    
    storesData = JSON.parse(data);
    
  } catch (err) {
    console.error('Error reading file:', err);
  } 
  // Find index of store with given ID
  const index = storesData.stores.findIndex(store => store.id == id);
  console.log(index);
  if (index !== -1) {
    // Remove store from array
    storesData.stores.splice(index, 1);

    // Write updated data back to the JSON file
    fs.writeFile('stores.json', JSON.stringify(storesData), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Store deleted successfully' });
      }
    });
  } else {
    res.status(404).json({ error: 'Store not found' });
  }
});
app.put('/store/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const updatedData = req.body;
  console.log(updatedData);
  let storesData = [];
  try {
    const data = fs.readFileSync('stores.json', 'utf8');
    storesData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  
  // Find index of store with given ID
  const index = storesData.stores.findIndex(store => store.id == id);
  console.log(index);
  
  if (index !== -1) {
    // Update store data
    storesData.stores[index] = updatedData;

    // Write updated data back to the JSON file
    fs.writeFile('stores.json', JSON.stringify(storesData), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Data updated successfully');
        res.status(200).json(updatedData);
      }
    });
  } else {
    res.status(404).json({ error: 'Store not found' });
  }
});

app.get('/store', (req, res) => {
    fs.readFile('stores.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        try {
          const filterStore = req.query.search;
          const storesData = JSON.parse(data);
          let filteredStores = storesData.stores;
          if(filterStore == undefined){
            res.status(200).json(filteredStores);
          }else{
            filteredStores = storesData.stores.filter(store =>{
           const filterLetters = filterStore.split(''); // Split filterStore into array of letters
           return filterLetters.every(letter => store.storeName.includes(letter));})
           res.status(200).json(filteredStores);
     }
          // res.status(200).json(storesData.stores);
        } catch (err) {
          console.error('Error parsing JSON:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  });
app.get('/store/:id', (req, res) => {
    const { id } = req.params;
    console.log("get");
    console.log(id);
    console.log("getic");
    fs.readFile('stores.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        try {
          const storesData = JSON.parse(data);
          const store = storesData.stores.find((store) => store.id == id);
          console.log(store);
          console.log("store is successfully fetched");
          if (store) {
            res.status(200).json(store);
          } else {
            res.status(404).json({ error: 'Store not found' });
          }
        } catch (err) {
          console.error('Error parsing JSON:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  });
  app.post('/store', (req, res) => {
  const { id,storeName, storeDescription,storeCountry, storeCity,storeLocation } = req.body;

  // Create object to store form data
  const newStore = {
    id,
    storeName,
    storeDescription,
    storeCountry,
    storeCity,
    storeLocation
  };
  console.log("selam");
  console.log(newStore);
  console.log("check data is inserted");

  // Read existing data from JSON file
  let storesData = [];
  try {
    const data = fs.readFileSync('stores.json', 'utf8');
    storesData = JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }

  // Add new store data to the array
  const dataStored = storesData.stores.push(newStore);

  // Write updated data back to the JSON file
  fs.writeFile('stores.json', JSON.stringify(storesData), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data written successfully');
      res.status(201).json(newStore);
    }
  });
});

app.delete('/store/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  let storesData = [];
  try {
    const data = fs.readFileSync('stores.json', 'utf8');
    
    storesData = JSON.parse(data);
    
  } catch (err) {
    console.error('Error reading file:', err);
  } 
  // Find index of store with given ID
  const index = storesData.stores.findIndex(store => store.id == id);
  console.log(index);
  if (index !== -1) {
    // Remove store from array
    storesData.stores.splice(index, 1);

    // Write updated data back to the JSON file
    fs.writeFile('stores.json', JSON.stringify(storesData), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Store deleted successfully' });
      }
    });
  } else {
    res.status(404).json({ error: 'Store not found' });
  }
});

app.get('/store', (req, res) => {
    fs.readFile('stores.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        try {
          const filterStore = req.query.search;
          const storesData = JSON.parse(data);
          let filteredStores = storesData.stores;
          if(filterStore == undefined){
            res.status(200).json(filteredStores);
          }else{
            filteredStores = storesData.stores.filter(store =>{
           const filterLetters = filterStore.split(''); // Split filterStore into array of letters
           return filterLetters.every(letter => store.storeName.includes(letter));})
           res.status(200).json(filteredStores);
     }
          // res.status(200).json(storesData.stores);
        } catch (err) {
          console.error('Error parsing JSON:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  });
app.get('/store/:id', (req, res) => {
    const { id } = req.params;
    console.log("get");
    console.log(id);
    console.log("getic");
    fs.readFile('stores.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        try {
          const storesData = JSON.parse(data);
          const store = storesData.stores.find((store) => store.id == id);
          console.log(store);
          console.log("store is successfully fetched");
          if (store) {
            res.status(200).json(store);
          } else {
            res.status(404).json({ error: 'Store not found' });
          }
        } catch (err) {
          console.error('Error parsing JSON:', err);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  });


// Server Side for Products

  app.post('/product', (req, res) => {
    const { id,storeName, productName,productDescription, productSerialNo,shelfNo,shelfName,expiryDate  } = req.body;
  
    // Create object to product form data
    const newProduct = {
      id,
      storeName,
      productName,
      productDescription,
      productSerialNo,
      shelfNo,
      shelfName,
      expiryDate
    };
  console.log("selam");
    console.log(newProduct);
    console.log("check product is inserted");
  
    // Read existing data from JSON file
    let productData = [];
    try {
      const data = fs.readFileSync('products.json', 'utf8');
      productData = JSON.parse(data);
    } catch (err) {
      console.error('Error reading file:', err);
    }
  
    // Add new product data to the array
    productData.products.push(newProduct);
  
    // Write updated data back to the JSON file
    fs.writeFile('products.json', JSON.stringify(productData), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Data written successfully');
        res.status(201).json(newProduct);
      }
    });
  });
  app.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    let productData = [];
    try {
      const data = fs.readFileSync('products.json', 'utf8');
      
      productData = JSON.parse(data);
      
    } catch (err) {
      console.error('Error reading file:', err);
    } 
    // Find index of product with given ID
    const index = productData.products.findIndex(product => product.id == id);
    console.log(index);
    if (index !== -1) {
      // Remove product from array
      productData.products.splice(index, 1);
  
      // Write updated data back to the JSON file
      fs.writeFile('products.json', JSON.stringify(productData), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Product deleted successfully' });
        }
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  app.put('/product/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const updatedData = req.body;
    console.log(updatedData);
    let productData = [];
    try {
      const data = fs.readFileSync('products.json', 'utf8');
      productData = JSON.parse(data);
    } catch (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    // Find index of product with given ID
    const index = productData.products.findIndex(product => product.id == id);
    console.log(index);
    
    if (index !== -1) {
      // Update product data
      productData.products[index] = updatedData;
  
      // Write updated data back to the JSON file
      fs.writeFile('products.json', JSON.stringify(productData), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          console.log('Data updated successfully');
          res.status(200).json(updatedData);
        }
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
  app.get('/product', (req, res) => {
      fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          try {
            const filterProduct = req.query.search;
            const produtctsData = JSON.parse(data);
          let filteredProducts = produtctsData.products;
          if(filterProduct == undefined){
            res.status(200).json(filteredProducts);
          }else{
            filteredProducts = produtctsData.products.filter(product =>{
           const filterLetters = filterProduct.split(''); // Split filterProduct into array of letters
           return filterLetters.every(letter => product.storeName.includes(letter));})
           res.status(200).json(filteredProducts);  
     }
          } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ error: 'Internal server error' });
          }
        }
      });
    });
app.get('/product/:id', (req, res) => {
      const { id } = req.params;
      console.log("get");
      console.log(id);
      console.log("getic");
      fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          try {
            const produtctsData = JSON.parse(data);
            const product = produtctsData.products.find((product) => product.id == id);
            console.log(product);
            console.log("product is successfully fetched");
            if (product) {
              res.status(200).json(product);
            } else {
              res.status(404).json({ error: 'Product not found' });
            }
          } catch (err) {
            console.error('Error parsing JSON:', err);
            res.status(500).json({ error: 'Internal server error' });
          }
        }
      });
    });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});