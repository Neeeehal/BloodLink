import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Navigation, Filter, X, Heart, Droplet, Users, Clock } from 'lucide-react';

// Import your components (adjust paths as needed)
import HeroComponent from "../../sections/hero/hero-component";
import HeaderComponent from "../../sections/header/header-component";
import FooterComponent from "../../sections/footer/footer-component";
import bloodDonationImg from '../../../assets/images/blood-donation(8).jpg'; 


const BloodLocator = () => {
  const navigate = useNavigate();
  // const [userLocation, setUserLocation] = useState(null);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPlaceFilterOpen, setIsPlaceFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [activeTab, setActiveTab] = useState('nearby');

  // Sample blood centers data
  const bloodCenters = [
    {
        name: "Life Saver Blood Centre",
        address: "1st FLOOR, SHARDA COLONY, NEW BUS STAND, Plot No. 08, Badiyakheri, Sehore, Madhya Pradesh 466001",
        phone: "+91 07562221122",
        lat: 23.21752656586763, 
        lng: 77.08694456804584,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Bhopal Blood Bank& Aditi Labs",
        address: "1st Floor, 4, Sultania Rd, opposite Prerna Society, Fatehgarh, Nakkar Khana, Peer Gate Area, Bhopal, Madhya Pradesh 462001",
        phone: "+91-11-25086155",
        lat: 23.32875425657351, 
        lng: 77.44316386511338,
        bloodTypes: ["A+", "B+", "O+", "O-", "A-"]
    },
    {
        name: "Tatpar Blood Bank",
        address: "10, Neelam Colony, near Lily Cinema, Barkhedi, Bhopal, Madhya Pradesh 462008",
        phone: "+91-07552576466",
        lat: 23.34892906613897, 
        lng: 77.36076640580553,
        bloodTypes: ["A+", "B+", "O+", "O-", "A-"]
    },
    {
        name: "Bansal Hospital Bhopal",
        address: "Sector C, Shahpura, Bhopal, Madhya Pradesh 462016",
        phone: "+91-120-4722000",
        lat: 23.204279510376082, 
        lng: 77.4190048858158,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "People Hospital Blood Bank",
        address: "Ayodhya Bypass Rd, Peoples Campus, Bhanpur, Bhopal, Madhya Pradesh 462038",
        phone: "+91-07554005227",
        lat: 23.309946896612747, 
        lng: 77.39840552098883,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Chl Apollo Hospital Blood Bank",
        address: "QV3P+6P8, MR 10 Rd, Lasudia Mori, Indore, Madhya Pradesh 452010",
        phone: "+91-07312445566",
        lat: 22.75605945234108,  
        lng: 75.88501501516573,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Shri Indore Cloth Market Hospital Blood Bank",
        address: "MRJJ+PXF, Vaishali Nagar, Indore, Madhya Pradesh 452017 ",
        phone: "+91-07312439223",
        lat: 22.684350615300556,   
        lng: 75.83319425675,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Suyash Hospital Blood Bankk",
        address: "5/1, AB Rd, opp. MGM medical College, Residency Area, Indore, Madhya Pradesh 452001",
        phone: "+91-07312439223",
        lat: 22.717270629186554, 
        lng: 75.8660988858158,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Thalesemia blood bank",
        address: "Nanda Nagar, Indore, Madhya Pradesh 452011",
        phone: "+91-07312439223",
        lat: 22.74846087634317,  
        lng: 75.87608862333447, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Vishnu Prabha Charitable Trust (Blood Bank)",
        address: "X27V+MGH, Kalani Bagh, Pachunkar Colony, Gomti Nagar, Dewas, Madhya Pradesh 455001",
        phone: "+09424022787",
        lat: 22.96719315697435, 
        lng: 76.04356882812539 ,
        bloodTypes: ["A+", "B+", "O+", "O-", "A-"]
    },
    {
        name: "Indian Red cross Blood bank dewas",
        address: "Geeta bhawan, Station Rd, Tekri Area, Itawa, Dewas, Madhya Pradesh 455001",
        phone: "+07272363518",
        lat: 22.976834077092253,  
        lng: 76.059123456789,
        bloodTypes: ["A+", "B+", "O+", "O-", "A-"]
    },
    {
        name: "Pushpa Mission Hospital",
        address: "Maria nagar, Dewas Rd, Rishi Nagar, Ujjain, Madhya Pradesh 456010",
        phone: "+07342512933",
        lat: 23.177764610927177, 
        lng: 75.79630632636788 ,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Ujjain Charitable Trust Blood Bank",
        address: "Geeta Colony, Ujjain, Madhya Pradesh 456006",
        phone: "+07344013621",
        lat: 23.208043829986345, 
        lng: 75.77607968084244,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Shree Blood Centre",
        address: "2nd floor, Shree Blood Centre, Hospital Rd, Geeta Colony, Dal Bazaar, Lashkar, Gwalior, Madhya Pradesh 474001",
        phone: "+91-9131711251",
        lat: 26.202806185973547,  
        lng: 78.16117530882923,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Sant Nirankari Blood Bank",
        address: "O-9, Western Urban Rd, Navpada, Vile Parle East, Vile Parle, Mumbai, Maharashtra 400057",
        phone: "022 26195539",
        lat: 19.116405375892775,   
        lng: 72.8547547616269,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Kokilaben Dhirubhai Ambani Blood Bank",
        address: "Rao Saheb Achutrao Patwardhan Marg, Shilpa Housing Society, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053",
        phone: "022 42696969",
        lat: 19.144931260759172,    
        lng: 72.82341556070371,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Navjivan Blood Bank And Lab",
        address: "Shop No.1, Abhilasha II, Punjabi Ln, Maharashtra Nagar, Borivali, Mumbai, Maharashtra 400092",
        phone: "08879093091",
        lat: 19.246092481189393,     
        lng: 72.8543146071024,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Bombay Hospital Trust Blood Bank",
        address: "Bombay Hospital, 12, Floor, New Marine Lines, Marine Lines, Mumbai, Maharashtra 400020",
        phone: "02222067676",
        lat: 18.95264190384408,      
        lng: 72.82341556070371,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Navi Mumbai Blood Bank",
        address: "Plot No. C-87, Near Kharghar Cha Raja Ganesh Temple, Sector 12, Kharghar, Navi Mumbai, Maharashtra 410210",
        phone: "07208042000",
        lat: 19.05371378352009,      
        lng: 73.0619475083325 ,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "North East Zone Chemists Educational & Welfare Trust's ",
        address: "H Wing, Aaradhya Edu-Health Centre, Aaradhya One Earth, Naidu Colony, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400075",
        phone: "02249603131",
        lat: 19.092944519710414, 
        lng: 72.91486447067581,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Matoshree Valbai Mulji Shah Arpan Blood Bank",
        address: " 1st Floor, Mid Town Plaza, Signal Mulund (W, near R-Mall, Shivaji Nagar, Thane, Maharashtra 400080",
        phone: "07507771544",
        lat: 19.195878095138966,
        lng:  72.94784545264012,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Lilavati Hospital And Research Centre Blood Bank",
        address: "A 791, Bandra Reclamation Rd, General Arunkumar Vaidya Nagar, Bandra West, Mumbai, Maharashtra 400050",
        phone: "02226751000",
        lat: 19.062250279222564, 
        lng: 72.82662190756398,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Dr. R. N. Cooper General Hospital Blood Bank",
        address: "4R5P+7J5, JVPD Scheme, Vile Parle West, Mumbai, Maharashtra 400056",
        phone: "02512400000",
        lat: 19.11675670602583,
        lng:  72.83486165327028,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Global Hospital Blood Bank",
        address: "XRXR+R3G, Parel East, Parel, Mumbai, Maharashtra 400012",
        phone: "02267670101",
        lat: 19.01356867975774, 
        lng:  72.8431013989766,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Manas Blood Bank",
        address: "1st Floor, Grace Plaza, Swami Vivekananda Rd, Momin Nagar, Jogeshwari West, Mumbai, Maharashtra 400102",
        phone: "02226784546",
        lat: 19.153084345057625, 
        lng: 72.84928120825633,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Indian Red Cross Society National Headquarter",
        address: "Sansad Marg, 1, Red Cross Rd, Sansad Marg Area, New Delhi, Delhi 110001",
        phone: "01123716441",
        lat: 28.62665139527289,  
        lng: 77.21062863456822,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "AIIMS Blood Bank",
        address: "Ansari Nagar East, AIIMS Campus, Ansari Nagar, New Delhi, Delhi 110029",
        phone: "01126588500",
        lat: 28.588057, 
        lng: 77.198144,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Sir Ganga Ram Hospital Blood Bank",
        address: "Rajinder Nagar, New Delhi, Delhi 110060",
        phone: "01125757777",
        lat: 28.635678, 
        lng: 77.180000,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Blood Centre of Triton Hospital",
        address: "CC 30-31, Outer Ring Rd, near Bhairon Mandir, Block G, Nehru Enclave, Kalkaji, New Delhi, Delhi 110019",
        phone: "01147354927",
        lat: 28.554580687954054,  
        lng: 77.25295329250211,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Blood Bank, LNJP Hospital",
        address: "J6QP+MM5, Maulana Azad Medical College Campus, LNJP Colony, New Delhi, Delhi, 110002",
        phone: "23233809",
        lat: 28.6490140958168,  
        lng: 77.23698382271031, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Divine Charitable Blood Bank Delhi",
        address: "3rd floor, Jeevan Anmol Hospital, Pratap Nagar, Mayur Vihar, Delhi, 110091",
        phone: "08595400422",
        lat: 28.616858536199302,   
        lng: 77.29287696698165, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "BHARAT SEWA CHARITABLE BLOOD CENTRE,Loni",
        address: "Indra Enclave, Sharanpur Road, below Johri metro station, Loni Border, Indra Enclave, Johripur, Delhi, Uttar Pradesh 201102",
        phone: "01171861978",
        lat: 28.71947447721821,    
        lng: 77.2895891349657, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "White Cross Blood Bank",
        address: "A60, Gali Number 3, A Block, East of Kailash, New Delhi, Delhi 110065",
        phone: "01149055916",
        lat: 28.570669227815678,     
        lng: 77.25013515077417, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Rotary Blood Bank",
        address: "56-57, Mehrauli - Badarpur Rd, Tughlakabad Institutional Area, Vayusenabad, New Delhi, Delhi 110062",
        phone: "0114905591",
        lat: 28.522080307001477,       
        lng: 77.24123889844891,
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Lions Blood Bank (NABH Accredited) Shalimar bagh, Delhi",
        address: "Ak Block, 100, Block AK, Poorbi Shalimar Bag, Shalimar Bagh, Delhi, 110088",
        phone: "09717897500",
        lat: 28.718093283260107,      
        lng: 77.15830234744116, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Delhi Plasma Bank",
        address: "Indian Society Of Clinical Nutrition Main Hospital Area, D-1, ILBS Hospital, Vasant Kunj, New Delhi, Delhi 110070",
        phone: "01149055",
        lat: 28.52734681004865,     
        lng:  77.16112445748178, 
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Blood Bank, Dr RML Hospital",
        address: "161, Kali Bari Ln, Havelock Square, Type III, President's Estate, New Delhi, Delhi 110001",
        phone: "01123348200",
        lat: 28.64216652284906,    
        lng:  77.1987525913566,  
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Chiranjeevi Eye and Blood Bank",
        address: "No.8-2-293, 82/A, Road No. 1, Jawahar Colony, Jubilee Hills, Hyderabad, Telangana 500033",
        phone: "04023555005",
        lat: 17.432330276268907,     
        lng: 78.41822014902671,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "DECCAN'S BLOOD CENTRE",
        address: "H.No, Bapu Bhavan H, 1st Floor, Dharam Karan Rd, beside MCH Ground, Ameerpet, Hyderabad, Telangana 500016",
        phone: "",
        lat: 17.44248418091874,     
        lng: 78.45117913185197,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Theresa Hospital Blood Bank: Blood Donation Camps",
        address: "Metro Station Erragadda, Raitu Bazzar, Czech Colony, Sanath Nagar, Hyderabad, Telangana 500018",
        phone: "04023812288",
        lat: 17.46148029035713,    
        lng:  78.43263970401277,  
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Sri Anjaniputhra Blood Centre",
        address: "B 1st floor, H no 5-5-35/154, Prashanti Nagar, IDA Kukatpally, Hyderabad, Telangana 500072",
        phone: "08885389033",
        lat: 17.48473145160819,     
        lng: 78.42714654020855,  
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Dr RONALD ROSS Blood Bank",
        address: "Sai Plaza, 3rd floor plot no 36 er nager hyd, KPHB Phase I, Dharma Reddy Colony Phase I, Kukatpally, Hyderabad, Telangana 500072",
        phone: "08886223113",
        lat: 17.503068299461717,    
        lng: 78.38732110262804,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "NTR Memorial Trust Blood Centre",
        address: "NTR Trust Bhavan, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034",
        phone: "04048577888",
        lat: 17.42774445667466,     
        lng: 78.42783318568408,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Sri Manyatha Voluntary Blood Center",
        address: "Service Rd, 5th Block, HBR Layout 4th Block, Nagavara, Bengaluru, Karnataka 560043",
        phone: "09980239887",
        lat: 13.041686380880448,     
        lng: 77.62774228726016,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Jeevaraksha Voluntary Blood Bank",
        address: "29-31, Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560051",
        phone: "09900777791",
        lat: 12.990842159157006,     
        lng: 77.59787320907478,  
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Bangalore Medical Services Trust",
        address: "New Thippasandra Main Rd, HAL 3rd Stage, Bhoomi Reddy Colony, New Tippasandra, Bengaluru, Karnataka 560075",
        phone: "09900153000",
        lat: 12.97980223419741,    
        lng: 77.65486478354346,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
    {
        name: "Bangalore Medical Services Trust",
        address: "New Thippasandra Main Rd, HAL 3rd Stage, Bhoomi Reddy Colony, New Tippasandra, Bengaluru, Karnataka 560075",
        phone: "09900153000",
        lat: 12.97980223419741,    
        lng: 77.65486478354346,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },  
    {
        name: "Bangalore Medical Services Trust",
        address: "New Thippasandra Main Rd, HAL 3rd Stage, Bhoomi Reddy Colony, New Tippasandra, Bengaluru, Karnataka 560075",
        phone: "09900153000",
        lat: 12.97980223419741,    
        lng: 77.65486478354346,   
        bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
    },
];
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Extract unique places from blood centers
  const places = [...new Set(bloodCenters.map(center => {
    const addressParts = center.address.split(',');
    // Get the city name (usually the second to last part)
    return addressParts[addressParts.length - 2].trim();
  }))].sort();

  useEffect(() => {
    // Get user location (currently not used, so just stop loading)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const filteredCenters = bloodCenters.filter(center => {
    const matchesBloodType = selectedBloodType ? center.bloodTypes.includes(selectedBloodType) : true;
    const matchesPlace = selectedPlace ? center.address.includes(selectedPlace) : true;
    return matchesBloodType && matchesPlace;
  });

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleNavigation = (page) => {
    switch(page) {
      case 'home':
        navigate('/');
        break;
      case 'host-blood-drive':
        navigate('/host-blood-drive');
        break;
      case 'help-needed':
        navigate('/contact');
        break;
      case 'need-blood':
        navigate('/need-blood');
        break;
      case 'donate-blood':
        navigate('/donate-blood');
        break;
      case 'nearby-blood-banks':
        // setActiveTab('nearby');
        break;
      case 'contact':
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  // Handle blood type selection
  const handleBloodTypeSelect = (bloodType) => {
    setSelectedBloodType(bloodType);
    setIsFilterOpen(false);
  };

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setIsPlaceFilterOpen(false);
  };

  // Clear blood type filter
  const clearBloodTypeFilter = () => {
    setSelectedBloodType('');
  };

  // Clear place filter
  const clearPlaceFilter = () => {
    setSelectedPlace('');
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBloodType('');
    setSelectedPlace('');
  };

  // Blood Locator Page Details (following the same pattern as DonateBloodPage)
  const BloodLocatorPageDetails = {
    hero: {
      subheadingText: "Find Blood Banks Near You",
      headingText: "Every Drop Counts, Every Life Matters",
      classHint: "blood-locator-page-hero",
      image: bloodDonationImg,
      
      
    },
    stats: {
      subheadingText: "Our Network",
      headingText: "Trusted Blood Bank Network",
      classHint: "side-col-image stats-section",
      paraText: `Our comprehensive network connects you with verified blood banks across the region:
      \n― ${bloodCenters.length}+ Blood banks available 24/7
      \n― Real-time availability updates
      \n― Emergency support and quick response
      \n― All blood types available
      \n― Verified and licensed blood centers
      \n― GPS-enabled location services`,
      
      buttonText: "Find Blood Banks",
      buttonLink: "/blood-locator",
      buttonHave: true,
    },
    emergency_info: {
      subheadingText: "Emergency Support",
      headingText: "24/7 Emergency Blood Support",
      classHint: "side-col-image emergency-info",
      paraText: [
        "Call 108 for immediate emergency assistance",
        "Contact nearest hospital directly for urgent needs",
        "Our network provides real-time blood availability",
        "GPS-enabled quick location services",
        "Verified blood centers with quality assurance",
        "Multiple blood types available round the clock",
      ],
      
      buttonText: "Emergency Request",
      buttonLink: "/need-blood",
      buttonHave: true,
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding blood banks near you...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderComponent />
      
      <HeroComponent {...BloodLocatorPageDetails.hero} />

      {/* Filter Modal - Blood Type */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Blood Type</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBloodTypeSelect(type)}
                  className={`p-4 rounded-lg border-2 text-center font-semibold transition-all duration-200 ${
                    selectedBloodType === type
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{type}</div>
                  <div className="text-xs text-gray-500">
                    {bloodCenters.filter(center => center.bloodTypes.includes(type)).length} banks
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearBloodTypeFilter}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Show All
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal - Place */}
      {isPlaceFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Location</h3>
              <button
                onClick={() => setIsPlaceFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
              {places.map((place) => (
                <button
                  key={place}
                  onClick={() => handlePlaceSelect(place)}
                  className={`w-full p-3 rounded-lg border text-left font-medium transition-all duration-200 flex items-center justify-between ${
                    selectedPlace === place
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{place}</div>
                    <div className="text-xs text-gray-500">
                      {bloodCenters.filter(center => center.address.includes(place)).length} blood bank{bloodCenters.filter(center => center.address.includes(place)).length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearPlaceFilter}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Show All
              </button>
              <button
                onClick={() => setIsPlaceFilterOpen(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connecting lives through our comprehensive blood bank network
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Droplet className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{bloodCenters.length}+</h3>
              <p className="text-gray-600">Blood Banks Available</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Lives Saved</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Emergency Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Blood Banks Near You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Search for blood banks in your area and filter by blood type for quick access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-black px-8 py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold transition-colors shadow-lg"
              >
                <Filter className="w-5 h-5" />
                Filter by Blood Type
              </button>
              <button
                onClick={() => setIsPlaceFilterOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-black px-8 py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold transition-colors shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Filter by Place
              </button>
              <button 
                onClick={() => handleNavigation('need-blood')}
                className="bg-white hover:bg-gray-50 text-red-600 border border-red-600 px-8 py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold transition-colors shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Emergency Request
              </button>
            </div>
          </div>

          {/* Active Filter Display */}
          {(selectedBloodType || selectedPlace) && (
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedBloodType && (
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Blood Type: {selectedBloodType}
                  </span>
                  <button
                    onClick={clearBloodTypeFilter}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {selectedPlace && (
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Location: {selectedPlace}
                  </span>
                  <button
                    onClick={clearPlaceFilter}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <button
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {(selectedBloodType || selectedPlace) 
                ? `Found ${filteredCenters.length} blood bank${filteredCenters.length !== 1 ? 's' : ''}` +
                  `${selectedBloodType ? ` with ${selectedBloodType} blood type` : ''}` +
                  `${selectedBloodType && selectedPlace ? ' in ' : ''}` +
                  `${selectedPlace ? selectedPlace : ''}`
                : `Showing all ${filteredCenters.length} blood banks in your area`
              }
            </p>
          </div>

          {/* Blood Centers Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCenters.map((center, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{center.name}</h3>
                    <div className="flex items-start gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-sm">{center.address}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {center.distance}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {center.status}
                    </span>
                  </div>
                </div>

                {/* Available Blood Types */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Available Blood Types:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.bloodTypes.map(type => (
                      <span
                        key={type}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedBloodType === type
                            ? 'bg-red-100 text-red-800 ring-2 ring-red-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCall(center.phone)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button
                    onClick={() => handleDirections(center.lat, center.lng)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blood banks found</h3>
              <p className="text-gray-600 mb-4">
                {(selectedBloodType || selectedPlace)
                  ? `No blood banks found${selectedBloodType ? ` with ${selectedBloodType} blood type` : ''}${selectedBloodType && selectedPlace ? ' in ' : ''}${selectedPlace ? selectedPlace : ''} in your area.`
                  : 'No blood banks found in your area.'
                }
              </p>
              {(selectedBloodType || selectedPlace) && (
                <button
                  onClick={clearAllFilters}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  View All Blood Banks
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-6 mx-4 mb-8 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Heart className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              <strong>Emergency:</strong> For urgent blood requirements, please call your nearest hospital directly or contact emergency services at 108.
            </p>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default BloodLocator;