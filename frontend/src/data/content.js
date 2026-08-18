// Static site content — edit this file to update products, posts, FAQs, etc.
export const CATEGORIES = [
 {
  "slug": "mobility-aids",
  "name": "Mobility Aids",
  "name_es": "Ayudas de Movilidad",
  "description": "Wheelchairs, walkers, rollators, canes and scooters to keep you moving safely.",
  "description_es": "Sillas de ruedas, andadores, rollators, bastones y scooters para mantenerlo en movimiento con seguridad.",
  "image": "https://images.pexels.com/photos/6194680/pexels-photo-6194680.jpeg?auto=compress&w=800",
  "order": 1,
  "id": "a6c57782-33ee-4523-a0a5-232141a32413"
 },
 {
  "slug": "orthotics",
  "name": "Braces",
  "name_es": "Soportes Ortopédicos",
  "description": "Knee, back, ankle and wrist braces — fitted for comfort and recovery.",
  "description_es": "Soportes para rodilla, espalda, tobillo y muñeca.",
  "image": "https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&w=800",
  "order": 2,
  "id": "6e584ecf-9d4c-4b96-83bf-9ebd89b3a2b2"
 },
 {
  "slug": "diabetes-care",
  "name": "Diabetic Supplies",
  "name_es": "Suministros para Diabéticos",
  "description": "CGM devices, glucose monitors, test strips and diabetic footwear.",
  "description_es": "Dispositivos MCG, monitores de glucosa, tiras reactivas y calzado.",
  "image": "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=800",
  "order": 3,
  "id": "119e7d16-4ab4-45b1-bb98-40ea71663780"
 },
 {
  "slug": "wound-care",
  "name": "Surgical Dressings",
  "name_es": "Apósitos Quirúrgicos",
  "description": "Advanced dressings, bandages and wound care supplies delivered to your door.",
  "description_es": "Apósitos avanzados y suministros para heridas.",
  "image": "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&w=800",
  "order": 4,
  "id": "867de9e5-0581-4911-b18f-4bedf1e8d00c"
 }
];

export const PRODUCTS = [
 {
  "slug": "standard-wheelchair",
  "name": "Standard Manual Wheelchair",
  "category_slug": "mobility-aids",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.unsplash.com/photo-1642680936843-b09109c69104?w=800&q=80",
  "featured": true,
  "in_stock": true,
  "description": "Lightweight steel-frame wheelchair with padded armrests and swing-away footrests. Typically covered by Medicare Part B with a doctor's prescription.",
  "features": [
   "300 lb weight capacity",
   "18\" seat width",
   "Foldable for transport",
   "Medicare Part B eligible"
  ],
  "id": "97c4287e-46a7-4547-81d5-85a3a47d6695"
 },
 {
  "slug": "transport-wheelchair",
  "name": "Lightweight Transport Wheelchair",
  "category_slug": "mobility-aids",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/6194680/pexels-photo-6194680.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Companion-propelled transport chair, only 19 lbs. Ideal for appointments and outings.",
  "features": [
   "19 lb aluminum frame",
   "Folds flat in seconds",
   "Loop-lock hand brakes"
  ],
  "id": "71731810-044f-40f4-a3ba-cf54d9ffdcd5"
 },
 {
  "slug": "rollator-walker",
  "name": "4-Wheel Rollator with Seat",
  "category_slug": "mobility-aids",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&w=800",
  "featured": true,
  "in_stock": true,
  "description": "Stable rollator with built-in seat, backrest and storage pouch. Covered by most insurance plans with prescription.",
  "features": [
   "Padded seat & backrest",
   "8\" wheels for outdoor use",
   "Height-adjustable handles",
   "Storage pouch included"
  ],
  "id": "06fd0235-21a1-42e6-9668-c108727005ee"
 },
 {
  "slug": "folding-walker",
  "name": "Two-Button Folding Walker",
  "category_slug": "mobility-aids",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Classic folding walker with 5\" front wheels. Medicare-covered with doctor's order.",
  "features": [
   "Folds with two buttons",
   "Adjustable height 32\"–39\"",
   "350 lb capacity"
  ],
  "id": "85e91d99-d80e-4504-8f69-4466f56b7f82"
 },
 {
  "slug": "quad-cane",
  "name": "Quad Cane with Offset Handle",
  "category_slug": "mobility-aids",
  "coverage": "cash",
  "price": 34.99,
  "image": "https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Four-point base cane for extra stability. Available for direct purchase — no prescription needed.",
  "features": [
   "Stands on its own",
   "Ergonomic offset handle",
   "Adjustable 28\"–37\""
  ],
  "id": "d17d9073-a6c5-4bf5-8064-3608c74c219e"
 },
 {
  "slug": "knee-scooter",
  "name": "Steerable Knee Scooter",
  "category_slug": "mobility-aids",
  "coverage": "cash",
  "price": 189.0,
  "image": "https://images.pexels.com/photos/6194680/pexels-photo-6194680.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Comfortable alternative to crutches after foot or ankle surgery.",
  "features": [
   "Steerable front wheels",
   "Dual hand brakes",
   "Folds for car trunk"
  ],
  "id": "6ddeb6f2-38c9-443d-ab13-0af6e508a370"
 },
 {
  "slug": "hinged-knee-brace",
  "name": "Hinged Knee Brace",
  "category_slug": "orthotics",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&w=800",
  "featured": true,
  "in_stock": true,
  "description": "Bilateral hinged support for ligament injuries and post-op recovery. Covered by Medicare with physician documentation.",
  "features": [
   "Bilateral aluminum hinges",
   "Breathable neoprene",
   "Open-patella design",
   "L1833 HCPCS code"
  ],
  "id": "9758b290-97a5-477a-8fa1-d07d45d6705a"
 },
 {
  "slug": "back-brace-lso",
  "name": "LSO Back Brace",
  "category_slug": "orthotics",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Lumbar-sacral orthosis for lower back pain and post-surgical support. Insurance covered with prescription.",
  "features": [
   "Rigid posterior panel",
   "Adjustable compression",
   "Fits waist 28\"–50\""
  ],
  "id": "f4168e06-5173-47bf-a96a-4a516bf716a3"
 },
 {
  "slug": "ankle-stabilizer",
  "name": "Lace-Up Ankle Stabilizer",
  "category_slug": "orthotics",
  "coverage": "cash",
  "price": 29.99,
  "image": "https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Figure-8 strapping system for sprains and chronic instability.",
  "features": [
   "Fits left or right",
   "Wear inside shoes",
   "Machine washable"
  ],
  "id": "8b9e0954-7e4d-4886-b530-af6d49aacfae"
 },
 {
  "slug": "wrist-splint",
  "name": "Carpal Tunnel Wrist Splint",
  "category_slug": "orthotics",
  "coverage": "cash",
  "price": 24.99,
  "image": "https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Night-time wrist support with removable palmar stay.",
  "features": [
   "Removable metal stay",
   "Breathable fabric",
   "Left and right versions"
  ],
  "id": "369c1564-d2f5-48a4-8e46-f26c73b9da1c"
 },
 {
  "slug": "cervical-collar",
  "name": "Soft Cervical Collar",
  "category_slug": "orthotics",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Foam neck support for whiplash and cervical strain. Covered with physician order.",
  "features": [
   "1\" contoured foam",
   "Hook-and-loop closure",
   "Latex free"
  ],
  "id": "25de6ca2-e741-4fb0-8193-c29ebeb2068f"
 },
 {
  "slug": "glucose-monitor-kit",
  "name": "Blood Glucose Monitor Kit",
  "category_slug": "diabetes-care",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=800",
  "featured": true,
  "in_stock": true,
  "description": "Complete testing kit: meter, lancing device, 10 lancets and carrying case. Covered by Medicare Part B for people with diabetes.",
  "features": [
   "5-second results",
   "300-reading memory",
   "No coding required",
   "Medicare Part B eligible"
  ],
  "id": "0423080b-5e93-4ace-b2da-250d9d7500ab"
 },
 {
  "slug": "test-strips-100",
  "name": "Glucose Test Strips (100 ct)",
  "category_slug": "diabetes-care",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Monthly resupply of test strips. Set up automatic resupply reminders so you never run out.",
  "features": [
   "100 strips per box",
   "Resupply eligible",
   "Auto-reminder available"
  ],
  "id": "983d0131-306e-4cb5-a973-8f4f2a8c5021"
 },
 {
  "slug": "cgm-sensor",
  "name": "Continuous Glucose Monitor Sensors",
  "category_slug": "diabetes-care",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/5938358/pexels-photo-5938358.jpeg?auto=compress&w=800",
  "featured": true,
  "in_stock": true,
  "description": "14-day wear CGM sensors. Covered by Medicare for qualifying patients on insulin.",
  "features": [
   "14-day wear time",
   "No fingersticks needed",
   "Smartphone compatible",
   "Resupply eligible"
  ],
  "id": "95cba811-b2b6-4bef-a826-01978c39afc7"
 },
 {
  "slug": "diabetic-shoes",
  "name": "Therapeutic Diabetic Shoes",
  "category_slug": "diabetes-care",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Extra-depth therapeutic footwear with custom inserts. Medicare covers one pair per year for qualifying patients.",
  "features": [
   "Extra-depth design",
   "3 custom inserts included",
   "One pair/year Medicare benefit"
  ],
  "id": "5a061714-168f-4b7c-b59b-5d9d8f3d406b"
 },
 {
  "slug": "lancets-100",
  "name": "Sterile Lancets (100 ct)",
  "category_slug": "diabetes-care",
  "coverage": "cash",
  "price": 9.99,
  "image": "https://images.pexels.com/photos/5938358/pexels-photo-5938358.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "30-gauge sterile lancets, compatible with most lancing devices.",
  "features": [
   "30 gauge ultra-thin",
   "Universal fit",
   "Resupply eligible"
  ],
  "id": "cb70e3fd-c341-4187-a9c3-31c5a7c94b18"
 },
 {
  "slug": "foam-dressings",
  "name": "Silicone Foam Dressings (10 ct)",
  "category_slug": "wound-care",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&w=800",
  "featured": true,
  "in_stock": true,
  "description": "Absorbent bordered foam dressings for pressure ulcers and surgical wounds. Covered under Medicare surgical dressing benefit.",
  "features": [
   "Gentle silicone border",
   "4\" x 4\" size",
   "Up to 7-day wear",
   "Resupply eligible"
  ],
  "id": "b87b3a82-37f9-444b-866c-e82328924894"
 },
 {
  "slug": "alginate-dressings",
  "name": "Calcium Alginate Dressings",
  "category_slug": "wound-care",
  "coverage": "insurance",
  "price": null,
  "image": "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Highly absorbent dressings for moderate-to-heavy draining wounds.",
  "features": [
   "Highly absorbent",
   "Conforms to wound bed",
   "Physician order required"
  ],
  "id": "c7102749-7c7a-4fe1-8c94-2b624fbf8267"
 },
 {
  "slug": "gauze-rolls",
  "name": "Sterile Gauze Rolls (12 pk)",
  "category_slug": "wound-care",
  "coverage": "cash",
  "price": 14.99,
  "image": "https://images.pexels.com/photos/5938358/pexels-photo-5938358.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Stretch gauze bandage rolls for securing dressings.",
  "features": [
   "4\" x 4.1 yd rolls",
   "Individually wrapped",
   "Latex free"
  ],
  "id": "cac55869-8188-404c-b884-70da0f2b39fa"
 },
 {
  "slug": "medical-tape-kit",
  "name": "Wound Care Starter Kit",
  "category_slug": "wound-care",
  "coverage": "cash",
  "price": 24.99,
  "image": "https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&w=800",
  "featured": false,
  "in_stock": true,
  "description": "Complete kit: gauze pads, paper tape, saline wipes and scissors.",
  "features": [
   "20 gauze pads",
   "Hypoallergenic tape",
   "Travel case included"
  ],
  "id": "d0262d09-d5cd-4ee2-a27e-e24a5a8088c8"
 }
];

export const FAQS = [
 {
  "question": "Does Medicare cover my medical equipment?",
  "question_es": "¿Medicare cubre mi equipo médico?",
  "answer": "Medicare Part B covers durable medical equipment (DME) like wheelchairs, walkers, glucose monitors and hospital beds when prescribed by your doctor and supplied by an accredited provider like CareFlex. You typically pay 20% of the Medicare-approved amount after your deductible.",
  "answer_es": "Medicare Parte B cubre equipos médicos duraderos (DME) como sillas de ruedas, andadores y monitores de glucosa cuando son recetados por su médico y suministrados por un proveedor acreditado como CareFlex. Generalmente paga el 20% del monto aprobado por Medicare después de su deducible.",
  "order": 1,
  "id": "7d4c32cc-3f9c-491d-961a-e532b4bbf70c"
 },
 {
  "question": "What do I need to get started?",
  "question_es": "¿Qué necesito para comenzar?",
  "answer": "Just three things: your insurance card, your doctor's contact information, and a prescription (we can help request it from your doctor). Complete our secure intake form or call us at (346) 621-1342 and we handle the rest.",
  "answer_es": "Solo tres cosas: su tarjeta de seguro, la información de contacto de su médico y una receta (podemos ayudar a solicitarla). Complete nuestro formulario seguro o llámenos al (346) 621-1342.",
  "order": 2,
  "id": "c4b79477-c9b2-403b-babf-0cb39e78cbef"
 },
 {
  "question": "How long does delivery take?",
  "question_es": "¿Cuánto tarda la entrega?",
  "answer": "Most in-stock items are delivered within 2–5 business days after insurance verification. Urgent hospital discharge orders are prioritized — call us for same-week delivery options.",
  "answer_es": "La mayoría de los artículos en stock se entregan dentro de 2 a 5 días hábiles después de la verificación del seguro. Los pedidos urgentes de alta hospitalaria son prioritarios.",
  "order": 3,
  "id": "09894e37-f7bb-4f9b-9fa9-ece3e8f8d5bc"
 },
 {
  "question": "Do you handle the insurance paperwork?",
  "question_es": "¿Se encargan del papeleo del seguro?",
  "answer": "Yes. Our team verifies your benefits, obtains prior authorizations, and works directly with your doctor's office to collect required documentation. You'll know your estimated out-of-pocket cost before anything ships.",
  "answer_es": "Sí. Nuestro equipo verifica sus beneficios, obtiene autorizaciones previas y trabaja directamente con el consultorio de su médico. Conocerá su costo estimado antes de que se envíe algo.",
  "order": 4,
  "id": "48e4a705-3b44-4b75-b735-620c28a5d203"
 },
 {
  "question": "Can I buy items without insurance?",
  "question_es": "¿Puedo comprar artículos sin seguro?",
  "answer": "Absolutely. Items marked with a 'Cash-Pay' badge can be purchased directly at transparent prices — no prescription or insurance needed for most of them.",
  "answer_es": "Por supuesto. Los artículos marcados con 'Pago Directo' se pueden comprar directamente a precios transparentes.",
  "order": 5,
  "id": "a3d1fbcd-a692-498e-a36f-d587d514927b"
 },
 {
  "question": "What insurance plans do you accept?",
  "question_es": "¿Qué planes de seguro aceptan?",
  "answer": "We accept Medicare Part B, Medicare Advantage plans, Medicaid, and most major commercial insurers. Visit our Insurance page or call to verify your specific plan.",
  "answer_es": "Aceptamos Medicare Parte B, planes Medicare Advantage, Medicaid y la mayoría de las aseguradoras comerciales.",
  "order": 6,
  "id": "ebd24835-e60f-4cf0-81e6-33d541e244ed"
 },
 {
  "question": "How do resupply reminders work?",
  "question_es": "¿Cómo funcionan los recordatorios de reabastecimiento?",
  "answer": "For disposables like test strips, CGM sensors and wound dressings, you can opt in to email or text reminders when you're due for a resupply. It's free, non-medical, and you can unsubscribe anytime.",
  "answer_es": "Para desechables como tiras reactivas y apósitos, puede optar por recibir recordatorios por correo electrónico o mensaje de texto. Es gratis y puede cancelar en cualquier momento.",
  "order": 7,
  "id": "463476b3-a37d-415f-8a8c-d2e54bfa5054"
 },
 {
  "question": "Is my health information safe?",
  "question_es": "¿Está segura mi información de salud?",
  "answer": "Yes. All protected health information is collected only through our HIPAA-compliant intake form (Jotform HIPAA under a signed BAA). Our website forms never ask for medical details.",
  "answer_es": "Sí. Toda la información de salud protegida se recopila únicamente a través de nuestro formulario HIPAA seguro. Los formularios de nuestro sitio web nunca solicitan detalles médicos.",
  "order": 8,
  "id": "17145659-6756-42fb-b379-2608593a5fd7"
 }
];

export const TESTIMONIALS = [
 {
  "name": "Margaret H.",
  "location": "Houston, TX",
  "rating": 5,
  "text": "CareFlex handled everything with Medicare for my husband's wheelchair. It arrived in four days and the delivery team showed us how to use it. Wonderful people.",
  "text_es": "CareFlex se encargó de todo con Medicare para la silla de ruedas de mi esposo. Llegó en cuatro días.",
  "order": 1,
  "id": "eaac3397-c313-4a77-a465-c6a34cd7b2b7"
 },
 {
  "name": "Robert D.",
  "location": "Katy, TX",
  "rating": 5,
  "text": "I was drowning in paperwork trying to get my mother a rollator. One call to CareFlex and they took over — approved and delivered in a week.",
  "text_es": "Una llamada a CareFlex y se encargaron de todo: aprobado y entregado en una semana.",
  "order": 2,
  "id": "083d2ab4-6931-4518-9de2-68e7d4e11e88"
 },
 {
  "name": "Linda S., RN",
  "location": "Case Manager, Houston Methodist",
  "rating": 5,
  "text": "As a discharge planner, I need DME suppliers who respond fast. CareFlex confirms referrals same-day and keeps our patients out of the gap.",
  "text_es": "Como planificadora de altas, necesito proveedores que respondan rápido. CareFlex confirma las referencias el mismo día.",
  "order": 3,
  "id": "3313d7e0-6b89-4708-8e15-61fd8aa266d7"
 },
 {
  "name": "Carlos M.",
  "location": "Sugar Land, TX",
  "rating": 5,
  "text": "The resupply reminders for my test strips are a lifesaver. I get a text, reply yes, and they ship. Never run out anymore.",
  "text_es": "Los recordatorios de reabastecimiento para mis tiras reactivas me salvan. Recibo un texto, respondo sí y las envían.",
  "order": 4,
  "id": "9cf81ffc-ef52-4919-9250-6fc890da7032"
 }
];

export const SERVICE_AREAS = [
 {
  "name": "Harris County",
  "cities": "Houston, Pasadena, Baytown, Spring, Cypress, Katy (east)",
  "order": 1,
  "id": "02d0878f-3ee8-42a5-bb05-c28bec068496"
 },
 {
  "name": "Fort Bend County",
  "cities": "Sugar Land, Missouri City, Richmond, Rosenberg, Katy (south)",
  "order": 2,
  "id": "6cb68c6c-ab4a-4862-9817-3651aadf65cd"
 },
 {
  "name": "Montgomery County",
  "cities": "The Woodlands, Conroe, Magnolia, Willis",
  "order": 3,
  "id": "39db4004-d365-40dd-afc8-4eff18c8899c"
 },
 {
  "name": "Brazoria County",
  "cities": "Pearland, Alvin, Angleton, Lake Jackson",
  "order": 4,
  "id": "8a1ab298-e0b1-44eb-af7f-a330abcb9bc3"
 },
 {
  "name": "Galveston County",
  "cities": "League City, Texas City, Galveston, Friendswood",
  "order": 5,
  "id": "3c31a266-c49f-4ab4-a1b5-4948f82e3226"
 },
 {
  "name": "Liberty County",
  "cities": "Liberty, Dayton, Cleveland",
  "order": 6,
  "id": "be882410-95d2-4d5e-b326-cb63c3066cf9"
 },
 {
  "name": "Waller County",
  "cities": "Waller, Hempstead, Prairie View",
  "order": 7,
  "id": "484cd580-b193-4e53-9e89-8fe1822940b2"
 },
 {
  "name": "Chambers County",
  "cities": "Mont Belvieu, Anahuac, Winnie",
  "order": 8,
  "id": "b1197c17-ae84-41f4-9522-a2a962dc960f"
 }
];

export const POSTS = [
 {
  "slug": "diabetes-supplies-through-medicare",
  "title": "How to Get Diabetes Supplies Through Medicare",
  "category": "Diabetes",
  "author": "CareFlex Team",
  "image": "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=800",
  "excerpt": "Test strips, CGMs, and therapeutic shoes — what's covered and how resupply works.",
  "content": "If you have diabetes and Medicare Part B, you're entitled to more coverage than most people realize.\n\n## Covered supplies\n- Blood glucose meters and test strips\n- Lancets and lancing devices\n- Continuous glucose monitors (CGMs) for qualifying patients\n- Therapeutic shoes and inserts (one pair per year)\n\n## How much can I get?\nQuantity limits depend on whether you use insulin. Insulin users can typically receive up to 300 strips every 3 months; non-insulin users up to 100.\n\n## Never run out again\nCareFlex offers free resupply reminders by text or email. When your resupply date approaches, we send a quick reminder — reply and your supplies ship. Opt in on any diabetes product page.\n\nCall (346) 621-1342 to verify your coverage in minutes.",
  "seo_title": "Medicare Diabetes Supplies Guide | CareFlex",
  "seo_description": "How to get glucose test strips, CGMs, and diabetic shoes covered through Medicare Part B.",
  "published": true,
  "id": "37127143-565e-459b-ae66-3932957f3cc8"
 },
 {
  "slug": "choosing-the-right-walker",
  "title": "Walker vs. Rollator: Which Is Right for You?",
  "category": "Mobility",
  "author": "CareFlex Team",
  "image": "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&w=800",
  "excerpt": "A simple comparison to help you or your loved one pick the safest mobility aid.",
  "content": "Choosing between a standard walker and a rollator comes down to balance, strength, and where you'll use it.\n\n## Standard walkers\nBest for people who need to put weight on the frame. They're lighter, more stable, and covered by Medicare with a prescription. The trade-off: you must lift or slide them with each step.\n\n## Rollators (wheeled walkers)\nBest for people with fair balance who tire easily. Four wheels, hand brakes, and a built-in seat let you walk farther and rest when needed.\n\n## Quick checklist\n- Need to lean heavily? → Standard walker\n- Walk longer distances outdoors? → Rollator\n- Need to rest often? → Rollator with seat\n- Narrow doorways at home? → Standard walker (usually slimmer)\n\nOur team can help you decide — call (346) 621-1342 or complete our intake form and we'll match the right equipment to your needs and coverage.",
  "seo_title": "Walker vs Rollator Comparison | CareFlex",
  "seo_description": "Compare standard walkers and rollators to find the safest mobility aid for you or a loved one.",
  "published": true,
  "id": "b63dd30c-7648-4222-9a62-e921de8e54f3"
 },
 {
  "slug": "medicare-dme-coverage-guide",
  "title": "Your 2026 Guide to Medicare DME Coverage",
  "category": "Insurance",
  "author": "CareFlex Team",
  "image": "https://images.pexels.com/photos/7578810/pexels-photo-7578810.jpeg?auto=compress&w=800",
  "excerpt": "What Medicare Part B covers, what you'll pay, and how to qualify for a wheelchair, walker, or glucose monitor.",
  "content": "Medicare Part B covers durable medical equipment (DME) when it is medically necessary and prescribed by your doctor for use in your home.\n\n## What counts as DME?\nWheelchairs, walkers, hospital beds, blood glucose monitors, CPAP machines, and certain orthotic braces all qualify. The equipment must withstand repeated use, serve a medical purpose, and be appropriate for home use.\n\n## What will I pay?\nAfter you meet your Part B deductible, you typically pay 20% of the Medicare-approved amount. If you have a Medigap or Medicare Advantage plan, your share may be lower — our team verifies this for you before anything ships.\n\n## The 3 steps to coverage\n1. **See your doctor.** You need a face-to-face visit and a written order.\n2. **Choose an accredited supplier.** Medicare only pays claims from accredited suppliers like CareFlex.\n3. **We handle the paperwork.** We collect the documentation, bill Medicare, and deliver to your door.\n\nQuestions? Call us at (346) 621-1342 — we're happy to check your coverage at no cost.",
  "seo_title": "Medicare DME Coverage Guide 2026 | CareFlex",
  "seo_description": "Learn what durable medical equipment Medicare Part B covers, what you'll pay, and how to qualify.",
  "published": true,
  "id": "ef715682-2642-45af-9e6b-346a2aa9c57c"
 }
];

