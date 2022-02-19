import got from 'got' ;
import {brands} from './models/brands'
import {Cars} from "./models/cars";



async function getCars(carBrand = brands[Math.floor(Math.random() * (brands.length))].name) {

    try {

        const response = await got(`http://api.divar.ir/v8/web-search/mashhad/car/${carBrand}`);

        const json = JSON.parse(response.body);
        const cars: Cars[]=[];
        // @ts-ignore
        json.widget_list.forEach(_item => {
            if(_item.data.description.includes('تومان')) {
                _item.data.description = _item.data.description.split('\n')
                _item.data.description[1]=_item.data.description[1].replace('تومان','')
                
                cars.push({
                    title: _item.data.title,
                    image: _item.data.image,
                    price: +_item.data.description[1],
                    kilometer: _item.data.description[0],
                    normalText: _item.data.normal_text,
                    index: _item.data.index,
                    city: _item.data.city,
                    district: _item.data.district,
                    category: _item.data.category
                });
            }
        })
        return cars;
    } catch (error) {
        console.log(error);
    }
}
  })
    return names;
};
export {getCars}
