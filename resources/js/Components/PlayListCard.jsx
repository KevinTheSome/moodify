import React from 'react';

const PlayListCard = (props) => {
    return (
        <a 
            href={props.external_links.spotify} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block max-w-sm rounded-lg overflow-hidden "
        >
            <div className="p-4 bg-gray-800 text-white">
                <h1 className="text-lg font-semibold mb-2">{props.name}</h1>
                <img 
                    src={props.images.url} 
                    alt={props.name} 
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>
        </a>
    );
};

export default PlayListCard;
