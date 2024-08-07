const yup = require('yup');


const phone = /^09\d{9}$/;
const addUser = yup.object().shape({
    fullName: yup.string().required('fullName is required'),
    phoneNumber: yup.string().matches(phone, 'Phone number is not valid').required('please enter your phoneNumber'),
    password: yup.string().required('please enter your password because password is required'),
    userName: yup.string().required('please enter your userName')
});

const addingProduct = yup.object().shape({
    farmerId: yup.string().required('please enter the farmer id'),
    name: yup.string().required("please enter the name of product"),
    typeOfProduct: yup.string().required('please enter the type of your product'),
    plantingDate: yup.date().required('please enter a Valid date').min(new Date(2000, 0, 1), 'Date must be later than January 1, 2000'),
    harvestDate: yup.date().required('please enter a Valid date').min(new Date(2000, 0, 1), 'Date must be later than January 1, 2000'),
    existence: yup.string().required('how much you have?'),
    price: yup.string().required('please enter the price for every kg')

})

module.exports={addUser,addingProduct};