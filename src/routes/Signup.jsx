import React, { useState } from "react";
import "../Styles/Signup.css";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import redpants from "../assets/redpants-radio.jpg";

function SignUp() {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const generateRandomUsername = () => {
        const leadingUsername = ["acrobatic", "adorable", "adventurous", "bitter", "boundless", "bright", "brilliant", "brittle",
            "delirious", "diminutive", "exultant", "filthy", "foolhardy", "gregarious", "intrepid", "jocular",
            "joyful", "jubilant", "keen", "kooky", "lanky", "lazy", "limp", "lush", "luxurious", "macabre", "magnanimous",
            "mellow", "miserable", "nimble", "nocturnal", "opulent", "ornate", "ordinary", "palatial", "parsimonious", "peevish",
            "picturesque", "potent", "practical", "precious", "putrid", "questionable", "quirky", "radiant", "raspy", "rustic",
            "scornful", "scrumptious", "silky", "sly", "spider-like", "spectacular", "tentacular", "tense", "thorny", "verdant",
            "whimsical", , "woeful", , "zesty",
            "acclaimed", "accomplished", "amazing", "amused", "baby-faced", "battered", "beaten", "bleeding", "boring", "broken"
            , "blushing", "bow-legged", "captivating", "cluttered", "confusing", "chosen", "complicated", "condemned", "crystallized",
            "customized", "dazzling", "depressed", "disgusting", "distressing", "disturbing", "dreaming", "driven", "dyed", "embarrassing",
            "exciting", "far-reaching", "fascinated", "freckled", "frustrating", "hard-hearted", "humiliating", "interesting", "irritating",
            "lying", "melted", "mouthwatering", "peaked", "puzzling", "relaxing", "riveting", "satisfied", "scared", "scented", "shocking", "sickening",
            "side-splitting", "staggering", "sweeping", "tattered", "threatening", "thrilled", "tired", "towering", "weathered", "wrinkled"
        ];
        const endingUsername = ["Aardvark", "Alligator", "Alpaca", "Anaconda", "Ant", "Anteater", "Antelope", "Aphid", "Armadillo", "Asp", "Ass", "Baboon", "Badger",
            "Barracuda", "Bass", "Bat", "Beaver", "Bedbug", "Bee", "Bird", "Bison", "Blue Jay", "Blue Whale", "Bobcat", "Buffalo", "Butterfly",
            "Buzzard", "Camel", "Carp", "Cat", "Caterpillar", "Catfish", "Cheetah", "Chicken", "Chimpanzee", "Chipmunk", "Cobra", "Cod", "Condor",
            "Cougar", "Cow", "Coyote", "Crab", "Cricket", "Crocodile", "Crow", "Cuckoo", "Deer", "Dinosaur", "Dog", "Dolphin", "Donkey", "Dove",
            "Dragonfly", "Duck", "Eagle", "Eel", "Elephant", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Flea", "Fly", "Fox", "Frog",
            "Goat", "Goose", "Gopher", "Gorilla", "Hamster", "Hare", "Hawk", "Hippopotamus", "Horse", "Hummingbird", "Husky", "Iguana", "Impala",
            "Kangaroo", "Lemur", "Leopard", "Lion", "Lizard", "Llama", "Lobster", "Margay", "Monkey", "Moose", "Mosquito", "Moth", "Mouse", "Mule",
            "Octopus", "Orca", "Ostrich", "Otter", "Owl", "Ox", "Oyster", "Panda", "Panther", "Parrot", "Peacock", "Pelican", "Penguin", "Perch",
            "Pheasant", "Pig", "Pigeon", "Porcupine", "Quagga", "Rabbit", "Raccoon", "Rat", "Rattlesnake", "Rooster", "Seal", "Sheep", "Skunk",
            "Sloth", "Snail", "Snake", "Spider", "Tiger", "Whale", "Wolf", "Wombat", "Zebra"]

        let tempUsername = "";

        tempUsername = tempUsername.concat(leadingUsername[Math.floor(Math.random() * leadingUsername.length)]);

        tempUsername = tempUsername.concat(endingUsername[Math.floor(Math.random() * endingUsername.length)]);

        for (let i = 0; i < 3; i++) {
            tempUsername = tempUsername.concat((Math.floor(Math.random() * 10)).toString())
        }

        return tempUsername;
    }

    /*
        *handleSubmit button
        *e represents user input, in this case, the email and password
        *createUserWithEmailAndPassword is a firebase function that takes in the auth and the email and password
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        let finalUsername = username.trim();

        if (!finalUsername) {
            // Generate a random username if not provided
            finalUsername = generateRandomUsername();
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const usernameRef = doc(db, "usernames", finalUsername);
            const usernameSnap = await getDoc(usernameRef);

            if (usernameSnap.exists()) {
                alert("Username is already taken. Please choose another one.");
                return;
            }

            await setDoc(doc(db, "users", userId), { email, username: finalUsername, /*uid: userId,*/ role: "user", createdAt: new Date() });
            await setDoc(usernameRef, { email: email });

            navigate('/payment');
            alert("Signed up successfully!");
        } catch (error) {
            console.error("ERROR SIGNUP: ", error);
            alert(error.message);
        }
    };


    return (
        <div className="SigninImageContainer" style={{ backgroundImage: `url('${redpants}')` }}>
            <div className="SigninContainer">
                <h1> Sign Up </h1>


                <form onSubmit={handleSubmit}>

                    <input id="usernameInput"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <br />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />

                    <br />

                    <button type="submit"> Sign Up </button>
                </form>

                <p className="AlreadyAccount"> Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default SignUp;

