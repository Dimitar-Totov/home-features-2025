const express = require('express');
const router = express.Router();

const data = [
    {
        "name": "Bonzy Home",
        "category": "chair",
        "imageUrl": "https://m.media-amazon.com/images/I/81CeoezcGHL.jpg",
        "price": "80$",
        "color": "Beige",
        "dimensions": "2.17 ft x 2.67 ft x 2.42 ft",
        "description": "Bonzy Home Modern Accent Chair, Lounge Single Sofa, Reading Armchair for Bedroom with Extra Thickened Seat, Solid Wooden Frame, Tub Occasional Chair, Beige",
    },
    {
        "name": "Kitchen Table Dining",
        "category": "table",
        "imageUrl": "https://www.overstock.com/cdn/shop/files/Kitchen-Table-Dining-Table-for-4-with-Storage-Shelf-Metal-Legs-Wood-Table-Top-for-Home-Dining-Room-Living-Room_1141131c-1600-4c0f-9a8c-105793aa4981.jpg?v=1718287712&width=1214",
        "price": "150$",
        "color": "Brown",
        "dimensions": "47.25 In. L X 47.25 In. W X 29.5 In. H",
        "description": "This kitchen table dining table is perfect for cozy meals with loved ones. It comfortably seats 4 people and features a convenient storage shelf underneath the tabletop, perfect for storing placemats or napkins. The metal legs offer sturdy support, while the wood tabletop adds a touch of warmth to your dining room or living room. This table is a great addition to any home looking for both practicality and style.",
    }, 
    {
        "name": "Amalfi",
        "category": "bed",
        "imageUrl": "https://www.danetti.com/cdn/shop/files/AmalfiLuxeSageLifestyleSide.jpg?v=1743669339&width=1946",
        "price": "900$",
        "color": "Sage Green",
        "dimensions": "251 In. L X 200 In. W X 37 In. H",
        "description": "The Amalfi Luxe sage green velvet king size ottoman storage bed is a luxurious and practical addition to any bedroom. Upholstered in a rich sage green velvet, this exclusive in-house design offers extra-deep storage accessed via a smooth, durable hydraulic lift mechanism.",
    }
]

router.get('/', function (req, res) {

    res.send(data);
})

module.exports = router