import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import Close from '../../assets/images/close.svg'
import Reply from '../../assets/images/tweet-reactions/reply.svg'
import ImgIcon from '../../assets/images/tweet-form-icons/img-atch.svg'
import GifIcon from '../../assets/images/tweet-form-icons/gif-add.svg'
import PollIcon from '../../assets/images/tweet-form-icons/poll.svg'
import EmojiIcon from '../../assets/images/tweet-form-icons/emoji.svg'
import ScheduleIcon from '../../assets/images/tweet-form-icons/schedule.svg'
import LocationIcon from '../../assets/images/tweet-form-icons/location.svg'
import { Link } from 'react-router-dom';
import resizeFile from "../functions/resizeFile.js";

function CreateTweet(props) {

    const { modal, replyData, replyImage, toggle, isActive, setActive } = props;
    const { userName, userAt, userID, userImage, userTweets } = useContext(AuthContext);
	
    const [text, setText] = useState("");
    const [createTweetActive, setCreateTweetActive] = useState(false)
    const [IMGs, setIMGs] = useState([]);
	const [previewIMGs, setPreviewIMGs] = useState([]);
	const [toast, setToast] = useState(false);

    const handleSubmit = (e) => {
		e.preventDefault();
        if ((text || IMGs) && text.length < 281) {
            if (replyData) {
                const { tweetID, tweeterID } = replyData;
                import("../functions/reply").then((reply) =>
                reply.default({
                    tweetID,
                    tweeterID,
                    userName,
                    userID,
                    userAt,
                    userTweets,
                    text,
                    IMGs,
                })
            ).then(() => {
                setText("");
                setIMGs([]);
				setPreviewIMGs([]);
                setTimeout(() => {
                    setToast("Your tweet was sent");
                }, 500);
                if(isActive) {
                    setActive(false)  
                }   
            })
            .catch((err) => console.log(err));
            
            } else {
                import("../functions/simpleTweet.js")
                        .then((simpleTweet) =>
                            simpleTweet.default({ userName, text, userAt, userID, userTweets, IMGs })
                        )
                        .then(() => {
                            setText("");
                            setIMGs([]);
						    setPreviewIMGs([]);
                            setTimeout(() => {
                                setToast("Your tweet was sent");
                            }, 500);
                            if(isActive) {
                                setActive(false)  
                            }   
                        })
                        .catch((err) => console.log(err));
                
            }   
        }
        if (toggle) {
			toggle();
			}
        
    }


    const handleChange = (e) => {
        setText(e.target.value);
	};



    const handleUpload = async (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0];
			const blob = await resizeFile(file, 500, 500);
			console.log(blob);
			addImage(blob);
		} else {
			console.log("that's not a picture");
		}
	};

    const addImage = (file) => {
		const names = IMGs.map((IMG) => IMG.name);
		if (IMGs.length > 3) {
			setToast("Please choose up to 4 photos.");
		} else if (names.includes(file.name)) {
			setToast("You've already uploaded that image!");
		} else {
			setIMGs((i) => [...i, file]);
		}
	};


    useEffect(() => {
		const removeImage = (name) => {
			setIMGs((prev) => prev.filter((img) => img.name !== name));
		};

		if (IMGs.length) {
			let tempArray = [];
			for (const img of IMGs) {
				const file = URL.createObjectURL(img);
				const jsx = (
					<div className="image-container" key={img.name} name={img.name}>
                        <div className="img-close-container">
							<img src={Close} alt="close" className="img-close" onClick={() => removeImage(img.name)} />
						</div>
						<img
							src={file}
							alt="user-submitted-pic"
							className="preview-image"
						/>
					</div>
				);
				tempArray.push(jsx);
                console.log(tempArray)
			}
			setPreviewIMGs(tempArray);
		} else {
			setPreviewIMGs([]);
		}
	}, [IMGs]);
    
 
  return (
    <>
    <div className="tf-backdrop"></div>
    <div className={`${modal ? 'modal' : 'active'}`}>
         {modal &&  (
				<div className="reply-header">
					<img src={Close} alt="close" onClick={() => {toggle()}} />
				</div>
                
			)}
        <div className="reply-modal">   
			{replyData && (
				<div className="reply tf-content">
					<div className=" reply tweet-avatar form">
						<img src={replyImage} alt="user-profile" className="profile-image" />
                        <div className='line'></div>
					</div>
					<div className=" reply tweet">
						<div className=" reply tweet-names">
							<span className="tweet-nick">{replyData.name}</span>
							<span className="tweet-username">@{replyData.at}</span>
							<span className="tweet-time">{replyData.timeSince}</span>
						</div>
						<p className=" reply tweet-text">{replyData.text}</p>
						<p className="grey">
							Replying to{" "}
							<Link to={`/${replyData.at}`} className="link">
								@{replyData.at}
							</Link>
						</p>
					</div>
				</div>
			)}
        <div>
            <div>
                <div className='tf-content'>  
                    <div className="tweet-avatar form">
                        <div>
                            <img src={userImage} alt="tweet avatar" />
                        </div>
                    </div>
                    <div className='tf-main'>
                        <div  className={createTweetActive ? 'tf-textarea active' : 'tf-textarea'}>
                        {!replyData ? (
                            <button>Everyone</button>
                            ): (
                                ""
                        )
                        }
                            <textarea onClick={() => setCreateTweetActive(true)} required value={text} maxLength="300" name="tweet" id="" cols="30" rows="10" placeholder={replyData ? "Tweet your reply" : "What's happening?"} onChange={handleChange}></textarea>
                        </div>
                        {previewIMGs.length > 1 ? (
							<div className="preview-images">
								<div className="preview-images-half">
									{previewIMGs.slice(0, Math.round(previewIMGs.length / 2))}
								</div>
								<div className="preview-images-half">
									{previewIMGs.slice(Math.round(previewIMGs.length / 2))}
								</div>
							</div>
						) : (
							previewIMGs.length > 0 && (
								<div className="preview-images">{previewIMGs}</div>
							)
						)}
                        {!replyData ? (
                        <div className={createTweetActive ? 'tf-can-reply active' : 'tf-can-reply'}>
                            <img src={Reply} alt="tweet avatar" />
                            <span>Everyone can reply</span>
                        </div>
                        ): (
                            ""
                        )
                        }
                        <div className='tf-footer'>
                            <div className='tf-footer-icons'>
                                <div> 
                                <label className='' htmlFor="picture-input">
                                    <img src={ImgIcon} className="tweet-img" alt="tweet avatar" />
                                </label> 
                                    <input
                                    id="picture-input"
                                    className="hide"
                                    type="file"
                                    onChange={handleUpload}
                                    accept="image/*"
                                />
                            </div>
                                <div> <img src={GifIcon} alt="tweet avatar" /></div>
                                <div> <img src={PollIcon} alt="tweet avatar" /></div>
                                <div> <img src={EmojiIcon} alt="tweet avatar" /></div>
                                <div> <img src={ScheduleIcon} alt="tweet avatar" /></div>
                                <div> <img src={LocationIcon} alt="tweet avatar" /></div>
                            </div>
                            <div className='tf-footer-btn'>
                                <button
                                    onClick={handleSubmit}
                                    value={replyData ? "Reply" : "Tweet"}
                                    className={`btn tweet-btn ${
                                        (text || IMGs.length) && text.length < 281
                                            ? `active-button`
                                            : "no-hov"
                                    }`}
                                >
                                    {replyData ? "Reply" : "Tweet"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    </div>
    </>

  )
}

export default CreateTweet