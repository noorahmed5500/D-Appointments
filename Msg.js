//Module for sendig & recieving msgs

import {firebase} from './config' 

export const RatingComments = async (docid, patientid, name, ratting, comment) =>{
    try {
        return await firebase.
        database().
        ref("Comments/" + docid).
        child(patientid).
        set({
            name: name,
            rating: ratting,
            words: comment, 
        });
    } catch (error) {
        return error
    }

}


export const SendMessage = async (currentUid, guestUid, wathmsg) =>{
    try {
        return await firebase.
        database().
        ref("messages/" + currentUid).
        child(guestUid).
        push({
            message:{
                sender: currentUid,
                reciever: guestUid,
                msg: wathmsg
            },
            
        });
    } catch (error) {
        return error
    }
}

export const RecieveMessage = async (currentUid, guestUid, wathmsg) =>{
    try {
        return await firebase.
        database().
        ref("messages/" + guestUid).
        child(currentUid).
        push({
            message:{
                sender: currentUid,
                reciever: guestUid,
                msg: wathmsg
            },
        });
    } catch (error) {
        return error
    }

}

//Setting up user's names
export const SendName = async (currentUid, guestUid, uname ,wathmsg) =>{
    try {
        return await firebase.
        database().
        ref("ulists/" + currentUid).
        child(guestUid).
        set({
                idd: guestUid,
                name: uname,
                msg: wathmsg,
        });
    } catch (error) {
        return error
    }
}

export const ReceiveName = async (currentUid, guestUid, sname ,wathmsg) =>{
    try {
        return await firebase.
        database().
        ref("ulists/" + guestUid).
        child(currentUid).
        set({
                idd: currentUid,
                name: sname,
                msg: wathmsg,
        });
    } catch (error) {
        return error
    }
}