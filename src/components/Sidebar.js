import React from 'react'
import Search from '../assets/images/search.svg'
import Avatar from '../assets/images/avatar.jpg'


function Sidebar() {
  return (
    <div className='sidebar-wrapper'>
        <div className="sidebar">
            <div className='sidebar-search-div'>
                <form>
                    <div className='sidebar-search-input-div'>
                        <div className='search-icon'>
                            <img src={Search} alt='search'/>
                        </div>
                        <div className='sidebar-search-input'>
                            <input type='text' placeholder='Search Twitter'/>
                        </div>
                    </div>
                </form>
            </div>
            <div className='sidebar-previous-images'>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className='sidebar-might-know'>
                <aside>
                    <div className='might-like'>
                        <span>You might like</span>
                    </div>
                    <div className='sidebar-suggestion-div'>
                        <div>
                            <div className='sidebar-suggestion'>
                                <div className='s-suggestion-img tweet-avatar'>
                                    <div>
                                        <img src='https://pbs.twimg.com/profile_images/1403739988009754624/xIkPjWVr_400x400.jpg' alt="tweet avatar" />
                                    </div>
                                </div>
                                <div className='sb-suggestion-names-button-div'>
                                    <div className='sb-acc-names'> 
                                        <div className='sb-acc-nickname'>
                                            <span>neural net guesses memes</span>    
                                        </div> 
                                        <div className='sb-acc-username'>@ResNeXtGuesser</div>
                                    </div>
                                    <div className='sb-follow-btn'>
                                            <button>Follow</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='sidebar-suggestion'>
                                    <div className='sb-suggestion-img tweet-avatar'>
                                        <div>
                                            <img src={Avatar} alt="tweet avatar" />
                                        </div>
                                    </div>
                                    <div className='sb-suggestion-names-button-div'>
                                        <div className='sb-acc-names'> 
                                            <div className='sb-acc-nickname'>
                                                <span>amir</span>    
                                            </div> 
                                            <div className='sb-acc-username'>@_introvertedaf</div>
                                        </div>
                                        <div className='sb-follow-btn'>
                                            <button>Follow</button>
                                        </div>
                                    </div>
                                    
                            </div>
                        </div>
                        <div>
                        <div className='sidebar-suggestion'>
                                <div className='s-suggestion-img tweet-avatar'>
                                    <div>
                                        <img src='https://pbs.twimg.com/profile_images/1587495316303056899/ckwI2LMR_400x400.jpg' alt="tweet avatar" />
                                    </div>
                                </div>
                                <div className='sb-suggestion-names-button-div'>
                                    <div className='sb-acc-names'> 
                                        <div className='sb-acc-nickname'>
                                            <span>origins of iconic images</span>    
                                        </div> 
                                        <div className='sb-acc-username'>@image_origins</div>
                                    </div>
                                    <div className='sb-follow-btn'>
                                            <button>Follow</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sb-show-more'>
                        <span>Show more</span>
                    </div>
                    
                </aside>
            </div>
        </div>
    </div>
  )
}

export default Sidebar



    /*
                    <div style={{ backgroundImage: `url(https://pbs.twimg.com/media/FmikF8LXEAEq9iT?format=jpg&name=240x240)` }}></div>
                    <div style={{ backgroundImage: `url(https://pbs.twimg.com/media/FmikGkdWIAMcOPp?format=jpg&name=240x240)` }}></div>
                    <div style={{ backgroundImage: `url(https://pbs.twimg.com/media/FmdikH0X0AU7IGW?format=jpg&name=240x240)` }}></div>
                    <div style={{ backgroundImage: `url(https://pbs.twimg.com/media/FmbEBnTXgAE3zRu?format=jpg&name=240x240)` }}></div>
                    <div style={{ backgroundImage: `url(https://pbs.twimg.com/media/Fl3vtcuWAAA1TRE?format=jpg&name=240x240)` }}></div>
                    <div style={{ backgroundImage: `url(https://pbs.twimg.com/media/FkvBTtXWIAEAcsO?format=jpg&name=120x120)` }}></div>
                */