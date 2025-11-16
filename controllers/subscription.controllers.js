import Subsciption from "../models/subscription.model.js"
import user from "../models/user.model.js"


export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subsciption.create({
            ...req.body, 
            user: req.user._id
        })

        res.status(201).json({
            success: true, 
            data: subscription
        })
    } catch (error) {
        next(error)
    }
}

export const getuserworkflow = async (req, res,next) => {
    try {
        if(req.user._id.toString() !== req.params._id){
            const error = new Error("you are not the owner")
            error.status = 401
            throw error
        }

        const subscriptions = await Subsciption.find({ user: req.params._id })

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error)
    }
}

export const getallsubscription = async (req, res, next) => {
    try {
        const allsubscription = await Subsciption.find()
        res.status(200).json({
            success: true, 
            data: allsubscription
        })
    } catch (error) {
        next(error)
    }
}

export const getsubscrptionid = async (req,res,next) => {
    try {
        const extracting = req.params.id
        const findsubscription = await Subsciption.findById(extracting)

        if(!findsubscription) { 
            const error = new Error("subscription not found ")
            error.status = 404
            throw error
        }
        if(req.user._id.toString() !== findsubscription.user.toString()){
            const error = new Error("you are not the owner ")
            error.status = 401
            throw error
        }

        res.status(200).json({
            success: true, 
            data: findsubscription
        })
    } catch (error) {
     next(error)   
    }
}

export const updatesubscription = async (req,res,next) => {
    try {
        const extracting = req.params.id
        const findsubscription = await Subsciption.findById(extracting)
       
        if(!findsubscription) {
            const error = new Error("subscription not found")
            error.status = 404
            throw error
        }

        if(req.user._id.toString() !== findsubscription.user.toString()){
            const error = new Error("you are not the owner") 
            error.status = 401
            throw error
        }
        const { name, price, currency, frequency, category, status, paymentMethod } = req.body

        const updatedSubscription = await Subsciption.findByIdAndUpdate(
            extracting,
            { name, price, currency, frequency, category, status, paymentMethod },
            { new: true }
        )
        res.status(200).json({
            success: true,
            data: updatedSubscription
        })
    } catch (error) {
        next(error)
    }
}

export const deletesubscription = async (req, res,next) => {
    try {
        const extracting = req.params.id
        const findsubscription = await Subsciption.findById(extracting)
       
        if(!findsubscription) {
            const error = new Error("subscription not found")
            error.status = 404
            throw error
        }

        if(req.user._id.toString() !== findsubscription.user.toString()){
            const error = new Error("you are not the owner") 
            error.status = 401
            throw error
        }

        const deletesubscription = await Subsciption.findByIdAndDelete(extracting)
        res.status(200).json({
            success: true,
            data: deletesubscription
        })
    } catch (error) {
        next(error)
    }
}

export const cancelsubscription = async (req, res, next) => {
    try {
        const extracting = req.params.id
        const findsubscription = await Subsciption.findById(extracting)
       
        if(!findsubscription) {
            const error = new Error("subscription not found")
            error.status = 404
            throw error
        }

        if(req.user._id.toString() !== findsubscription.user.toString()){
            const error = new Error("you are not the owner") 
            error.status = 401
            throw error
        }

        const cancelledSubscription = await Subsciption.findByIdAndUpdate(
            extracting,
            { status: 'cancelled' },
            { new: true }
        )
        
        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
            data: cancelledSubscription
        })
    } catch (error) {
        next(error)
    }
}

export const upcomingrenewals = async (req, res, next) => {
    try {
        const today = new Date()
        const futureDate = new Date()
        futureDate.setDate(futureDate.getDate() + 30)

        const upcomingSubscriptions = await Subsciption.find({
            renewDate: { $gte: today, $lte: futureDate },
            status: 'active'
        }).populate('user').sort({ renewDate: 1 })

        res.status(200).json({
            success: true,
            data: upcomingSubscriptions
        })
    } catch (error) {
        next(error)
    }
}