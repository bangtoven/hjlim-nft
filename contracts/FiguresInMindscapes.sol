// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "./Base64.sol";

contract FiguresInMindscapes is ERC721, Ownable, ERC2981 {
    using Strings for uint256;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) private names;
    mapping(uint256 => string) private images;

    constructor() ERC721("Figures in Mindscapes", "HJL") {
        _setDefaultRoyalty(msg.sender, 500);
    }

    function safeMint(string memory name, string memory image) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        names[tokenId] = name;
        images[tokenId] = image;

        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(_tokenId));
        return buildMetadata(_tokenId);
    }

    function buildMetadata(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        string memory name = names[_tokenId];
        string memory image = images[_tokenId];
        string memory description= "asdfasdf";
        string memory url = string(
            abi.encodePacked(
                "https://nft.hyunjeonglim.com/ko5ynxPq/",
                _tokenId.toString()
            )
        );

        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"', name, '",',
                                '"description":"', description, '",',
                                '"external_url":"', url, '",',
                                '"image":"data:image/jpeg;base64,',
                                image,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}