import sumitMain from '@/assets/sumit/BAUHAUS PHOTOS 05.webp';
import rajeshMain from '@/assets/rajesh.jpg';
import fahemMain from '@/assets/fahem.jpg';
import arpitMain from '@/assets/arpit.jpg';
import taikenMain from '@/assets/Taiken 08.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

// Somesh & Priyanka Photos
import someshPriyankaMain from '@/assets/somesh&priyanka.jpg.jpg';
import someshPriyanka2 from '@/assets/somesh&priyankas2.jpg.jpg';

// Pranav Photos
import pranavMain from '@/assets/pranav1.jpg.jpg';
import pranav2 from '@/assets/pranav2.jpg.jpg';

// Rajkiran Photos
import rajkiranMain from '@/assets/Rajkiran2.jpg (1).jpg';
import rajkiran2 from '@/assets/rajkiran2 (1).jpg';

// Mohit Gupta Photos
import mohitGuptaMain from '@/assets/mohitGupta1.jpg (1).jpg';
import mohitGupta2 from '@/assets/mohitGupta.jpg (1).jpg';

// Rahul & Nisha Photos
import rahulNishaMain from '@/assets/Rahul&nisha.jpg (1).jpg';
import rahulNisha2 from '@/assets/Rahul&Nisha2.jpg (1).jpg';

// Kuldeep Photos
import kuldeepMain from '@/assets/kuldeep (1).jpg.jpg';
import kuldeep1 from '@/assets/kuldeep1 (1).jpg';

// Sumit Photos
import sumit1 from '@/assets/sumit/BAUHAUS PHOTOS 05.webp';
import sumit2 from '@/assets/sumit/BAUHAUS PHOTOS 09.webp';
import sumit3 from '@/assets/sumit/BAUHAUS PHOTOS 13.webp';
import sumit4 from '@/assets/sumit/BAUHAUS PHOTOS 19.webp';
import sumit5 from '@/assets/sumit/BAUHAUS PHOTOS 27.webp';
import sumit6 from '@/assets/sumit/BAUHAUS PHOTOS 28.webp';
import sumit7 from '@/assets/sumit/BAUHAUS PHOTOS 29.webp';
import sumit8 from '@/assets/sumit/BAUHAUS PHOTOS 35.webp';
import sumit9 from '@/assets/sumit/BAUHAUS PHOTOS 42.webp';

// Rajesh Photos
import rajesh1 from '@/assets/Rajesh/PRA00001_2_3_4_5.jpg';
import rajesh2 from '@/assets/Rajesh/PRA00006_07_08_09_10.jpg';
import rajesh3 from '@/assets/Rajesh/PRA00011_2_3_4_5.jpg';
import rajesh4 from '@/assets/Rajesh/PRA00016_17_18_19_20.jpg';
import rajesh5 from '@/assets/Rajesh/PRA00021_2_3_4_5.jpg';
import rajesh6 from '@/assets/Rajesh/PRA00026_27_28_29_30.jpg';
import rajesh7 from '@/assets/Rajesh/PRA00031_2_3_4_5.jpg';
import rajesh8 from '@/assets/Rajesh/PRA00070.jpg';

// Faheem Photos
import faheem1 from '@/assets/Faheem/PRA00763_4_5 (1).jpg';
import faheem2 from '@/assets/Faheem/PRA00766_7_8.jpg';
import faheem3 from '@/assets/Faheem/PRA00772_3_4.jpg';
import faheem4 from '@/assets/Faheem/PRA00775_6_7.jpg';
import faheem5 from '@/assets/Faheem/PRA00778_79_80.jpg';
import faheem8 from '@/assets/Faheem/PRA00790_1_2.jpg';
import faheem9 from '@/assets/Faheem/PRA00796_7_8.jpg';
import faheem10 from '@/assets/Faheem/PRA00799_800_801.jpg';
import faheem11 from '@/assets/Faheem/PRA00805_6_7.jpg';
import faheem12 from '@/assets/Faheem/PRA00811_2_3.jpg';
import faheem13 from '@/assets/Faheem/PRA00820_1_2.jpg';
import faheem14 from '@/assets/Faheem/PRA00823_4_5.jpg';
import faheem15 from '@/assets/Faheem/PRA00835_6_7.jpg';
import faheem17 from '@/assets/Faheem/PRA00844_5_6.jpg';
import faheem18 from '@/assets/Faheem/PRA00862_3_4.jpg';
import faheem19 from '@/assets/Faheem/PRA00868_69_70.jpg';
import faheem20 from '@/assets/Faheem/PRA00906_07_08_09_10.jpg';

// Taiken Photos
import taiken2 from '@/assets/Taiken/Taiken-02.jpg';
import taiken3 from '@/assets/Taiken/Taiken-03.jpg';
import taiken4 from '@/assets/Taiken/Taiken-04.jpg';
import taiken5 from '@/assets/Taiken/Taiken-05.jpg';
import taiken7 from '@/assets/Taiken/Taiken-08.jpg';
import taiken9 from '@/assets/Taiken/Taiken-13.jpg';
import taiken10 from '@/assets/Taiken/Taiken-14.jpg';
import taiken11 from '@/assets/Taiken/Taiken-19.jpg';

export interface Project {
    id: string;
    title: string;
    client: string;
    location: string;
    image: string;
    description: string;
    type: 'residential' | 'commercial';
    gallery: string[];
    configuration?: string;
    handoverYear?: string;
}

export const projects: Project[] = [
    // Project 1
    {
        id: 'somesh-priyanka-residential',
        title: 'Somesh and Priyanka Residence',
        client: 'Somesh and priyanka',
        location: 'Bavdhan, Pune',
        image: someshPriyankaMain,
        description: 'Equipped with modern amenities and a sophisticated design, this 3BHK residence in Bavdhan reflects the lifestyle of its owners.',
        type: 'residential',
        gallery: [someshPriyankaMain, someshPriyanka2],
        configuration: '3bhk',
        handoverYear: '2025'
    },
    // Project 2
    {
        id: 'pranav-akriti-residential',
        title: 'Pranav & Akriti Home',
        client: 'Pranav & Akriti',
        location: 'Pune',
        image: pranavMain,
        description: 'A contemporary residential project in Pune, tailored to the specific needs of Pranav and Akriti.',
        type: 'residential',
        gallery: [pranavMain, pranav2],
        configuration: '3bhk',
        handoverYear: '2023'
    },
    // Project 3
    {
        id: 'Rajesh Mohapatra',
        title: 'Rajesh Mohapatra ',
        client: 'Rajesh Mohapatra',
        location: 'Pune',
        image: rajeshMain,
        description: 'A modern residential project designed for Rajesh Mohapatra, focusing on functionality and aesthetic appeal with high-quality finishes and bespoke furniture tailored for urban living.',
        type: 'residential',
        gallery: [rajesh1, rajesh2, rajesh3, rajesh4, rajesh5, rajesh6, rajesh7, rajesh8],
        configuration: '3bhk',
        handoverYear: '2025'
    },
    // Project 4
    {
        id: 'rajkiran-bande-residential',
        title: 'Rajkiran Bande Residence',
        client: 'Rajkiran Bande',
        location: 'Pune',
        image: rajkiranMain,
        description: 'A sleek and modern 2BHK apartment in Pune, designed for Rajkiran Bande.',
        type: 'residential',
        gallery: [rajkiranMain, rajkiran2],
        configuration: '2bhk',
        handoverYear: '2024'
    },
    // Project 5
    {
        id: 'mohit-gupta-residential',
        title: 'Mohit Gupta Apartment',
        client: 'Mohit Gupta',
        location: 'Pune',
        image: mohitGuptaMain,
        description: 'A stylish and functional 2BHK residential interior in Pune for Mohit Gupta.',
        type: 'residential',
        gallery: [mohitGuptaMain, mohitGupta2],
        configuration: '2bhk',
        handoverYear: '2025'
    },
    // Project 6
    {
        id: 'Faheem Shaikh',
        title: 'Faheem Shaikh',
        client: 'Faheem',
        location: 'Pune',
        image: fahemMain,
        description: 'A contemporary residential villa interior designed for Faheem Shaikh, seamlessly blending modern aesthetics with traditional comfort through elegant layouts and premium finishes.',
        type: 'residential',
        gallery: [faheem1, faheem2, faheem3, faheem4, faheem5, faheem8, faheem9, faheem10, faheem11, faheem12, faheem13, faheem14, faheem15, faheem17, faheem18, faheem19, faheem20],
        configuration: '2bhk',
        handoverYear: '2023'
    },
    // Project 7
    {
        id: 'rahul-nisha-residential',
        title: 'Rahul & Nisha Residence',
        client: 'Rahul & Nisha',
        location: 'Pune',
        image: rahulNishaMain,
        description: 'A beautiful 3BHK home in Pune, reflecting the elegant taste of Rahul and Nisha.',
        type: 'residential',
        gallery: [rahulNishaMain, rahulNisha2],
        configuration: '3bhk',
        handoverYear: '2023'
    },
    // Project 8
    {
        id: 'Arpit Jalan',
        title: 'Arpit Jalan',
        client: 'Arpit Jalan',
        location: 'Pune',
        image: arpitMain,
        description: 'A compact studio apartment designed with a focus on smart usage of space. The interior features multi-functional furniture and a light color palette, creating a spacious feel.',
        type: 'residential',
        gallery: [arpitMain, project2, project3],
        configuration: '3Bhk',
        handoverYear: '2025'
    },
    // Project 9
    {
        id: 'Sumit Oswal',
        title: 'Sumit Oswal',
        client: 'Sumit Oswal',
        location: 'Pune',
        image: sumitMain,
        description: 'An elegant residential interior designed for Sumit Oswal, featuring premium materials and a sophisticated design language that reflects modern luxury and personalized comfort.',
        type: 'residential',
        gallery: [sumit1, sumit2, sumit3, sumit4, sumit5, sumit6, sumit7, sumit8, sumit9],
        configuration: '3bhk',
        handoverYear: '2025'
    },
    // Project 10
    {
        id: 'kuldeep-residential',
        title: 'Kuldeep Residence',
        client: 'Kuldeep',
        location: 'Pune',
        image: kuldeepMain,
        description: 'A minimalist 2BHK apartment in Pune, designed for Kuldeep.',
        type: 'residential',
        gallery: [kuldeepMain, kuldeep1],
        configuration: '2bhk',
        handoverYear: '2024'
    },
    // Project 11
    {
        id: 'taiken-pan-asian',
        title: 'Taiken The Pan Asian',
        client: 'Taiken',
        location: 'Pune',
        image: taikenMain,
        description: 'A bold and atmospheric interior design for a Pan Asian restaurant in Kharadi, Pune. The space blends traditional Asian aesthetics with modern industrial elements, creating an immersive dining experience.',
        type: 'commercial',
        gallery: [taiken2, taiken3, taiken4, taiken5, taiken7, taiken9, taiken10, taiken11],
        configuration: 'Pan Asian Restaurant',
        handoverYear: '2025'
    },
    // Project 12
    {
        id: 'prashant-guleria-residential',
        title: 'Prashant Guleria Home',
        client: 'Prashant Guleria',
        location: 'Pune',
        image: project1,
        description: 'A sophisticated 3BHK residential interior in Pune for Prashant Guleria.',
        type: 'residential',
        gallery: [project1, project2],
        configuration: '3bhk',
        handoverYear: '2025'
    },
    // Additional project (not in the main sequence)
    {
        id: 'corporate-workspace',
        title: 'Corporate Workspace',
        client: 'Modular Office Solutions',
        location: 'Hinjewadi, Pune',
        image: project2,
        description: 'A modern commercial interior designed as an open-plan office that fosters collaboration and productivity. The workspace combines functional layouts, contemporary design elements, and premium finishes.',
        type: 'commercial',
        gallery: [project2, project3],
        configuration: 'Modular Office',
        handoverYear: '2023'
    }
];
