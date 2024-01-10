import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const DEFAULT_PRODUCT = 1;
const products = [
    {
        id: 1,
        campaign: 'default',
        contractAddress: '0x4879372A662a09ce5Fd64CD7523B8F231Ac200f8',
        ticketPriceString: '3,000',
        bucketUrl: 'verse-scratcher-images',
        ticketPrice: 3000, 
        title: 'Space Collection',
        jackpotString: '1,000,000',
        templateFolder: 'default',
        homeLinkColor: '#0085FF',
        jackpot: 1000000,
        lowestPrice: 100,
        lowestPriceString: '100',
        highestPrice: 100000,
        highestPriceString: '100k',
        cover: '/spaceexpeditions/cover.png',
        backgroundImage: `url('/bg.png')`,
        jackpotBoxColorOne: '#363E82',
        jackpotBoxColorOneTitle: '#BFD9FF',
        jackpotBoxColorTwo: '#4C3777',
        jackpotBoxColorTwoTitle: '#F7C0F8',
        jackpotBoxColorThree: '#6E376F',
        jackpotBoxColorThreeTitle: '#F7C0F8',
        meta: {
          title: "Scratch & Win: On-Chain Scratch Tickets Powered by Verse",
          description: "Purchase and play on-chain scratch tickets with instant results and immediate prize claims.",
          socialImage: "https://scratcher.verse.bitcoin.com/meta.png"
        }
    },
    {
        id: 2,
        campaign: 'lunar-new-year',
        contractAddress: '0x6f1153964310d0f9f9edc60d123460e61aad385b',
        ticketPriceString: '22,000',
        bucketUrl: 'scratchverse',
        ticketPrice: 22000, 
        title: 'Lunar New Year (Limited Edition)',
        cover: '/lunar/cover.png',
        jackpotString: '8,888,888',
        templateFolder: 'lunar',
        homeLinkColor: '#a98529',
        jackpot: 8888888,
        lowestPrice: 888,
        lowestPriceString: '888',
        highestPrice: 800000,
        highestPriceString: '800k',
        backgroundImage: `url('/lunar/background.png')`,
        jackpotBoxColorOne: '#232323',
        jackpotBoxColorOneTitle: '#fac43b',
        jackpotBoxColorTwo: '#232323',
        jackpotBoxColorTwoTitle: '#fac43b',
        jackpotBoxColorThree: '#232323',
        jackpotBoxColorThreeTitle: '#fac43b',
        meta: {
          title: "Scratch & Win: On-Chain Scratch Tickets Powered by Verse",
          description: "Purchase and play on-chain scratch tickets with instant results and immediate prize claims.",
          socialImage: "https://scratcher.verse.bitcoin.com/meta_lunar.png"
        }
    }
]

const route = useRoute()

const updateMetaData = (product) => {
  const descEl = document.querySelector('head meta[name="description"]');
  const titleEl = document.querySelector('head title');
  const ogImage = document.querySelector('head meta[property="og:image"]');    

  titleEl.textContent = product.meta.title
  descEl.setAttribute('content', product.meta.description)
  ogImage.setAttribute('content', product.meta.socialImage)
}

const initProduct = () => {
  const urlParams = new URLSearchParams(window.location.search);;
  const campaign = urlParams.get('campaign');
  urlParams.delete("campaign");
  window.history.replaceState({}, '', `${window.location.pathname}`);


  let product = products.find(product => product.campaign === campaign);

   if(product && product.id) {
      updateMetaData(product)
      return product.id 
   } else {
    let activeProduct = localStorage.getItem('collection') || DEFAULT_PRODUCT
    let product = products.find(product => product.id === parseInt(activeProduct));

    updateMetaData(product)
     return parseInt(product.id)
   }
}

export const store = reactive({
  productId: initProduct(), // default product
  updateProduct(value) {
    this.productId = value
    localStorage.setItem('collection', value)
  },
  getProduct() {
    return products.find(product => product.id === this.productId);
  },
  getProductContractAddresses() {
    return products.map(product => product.contractAddress)
  },
  getProducts() {
    return products
  }
})


