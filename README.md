[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/ccr5/betting-championship-smart-contract">
    <img src="images/logo.png" alt="Logo" width="150">
  </a>

  <h3 align="center">Betting Championship Smart Contract</h3>

  <p align="center">
    Do you think will your favorite team win the 2022 - Brazilian Championship?
    <br />
    <a href="https://github.com/ccr5/betting-championship-smart-contract/tree/main/docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ccr5/betting-championship-smart-contract/issues">Report Bug</a>
    ·
    <a href="https://github.com/ccr5/betting-championship-smart-contract/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

This project is a part of my first dApp. The goal is develop a platform where it is possible 
to bet using BET Tokens bought with ether on any team in the brazilian championship until the 
tenth round and, at the end of the competition, if you win, you will receive all BET tokens.

To see the website, please go to [Betting Championship dApp](https://github.com/ccr5/betting-championship-dapp).

### Built With

* [Hardhat](https://hardhat.org/)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* NodeJS
* Hardhat
* MetaMask

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ccr5/betting-championship-smart-contract.git
   ```
2. Install packages
   ```sh
   yarn
   ```
3. Make migrations to create a local smart contract
    ```sh
    truffle migrate 
    ```
4. Start hardhat node server
   ```sh
   npx hardhat node
   ```
5. Run Betting deploy script
   ```sh
   npx hardhat run --network scripts/Betting-deploy.ts
   ```

## Usage


<p align="center">
  <a href="https://github.com/ccr5/betting-championship-smart-contract">
    <img src="images/home.png" alt="Logo" width="100%">
  </a>
  with your metamask connected to the Hardhat network and an imported account 
  (it cannot be the one running the contracts), choose your team and bet.
</p>

## Roadmap

See the [open issues](https://github.com/ccr5/betting-championship-smart-contract/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Matheus Nobre Gomes - matt-gomes@live.com

Project Link: [https://github.com/ccr5/betting-championship-smart-contract](https://github.com/ccr5/betting-championship-smart-contract)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ccr5/betting-championship-smart-contract.svg?style=for-the-badge
[contributors-url]: https://github.com/ccr5/betting-championship-smart-contract/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ccr5/betting-championship-smart-contract.svg?style=for-the-badge
[forks-url]: https://github.com/ccr5/betting-championship-smart-contract/network/members
[stars-shield]: https://img.shields.io/github/stars/ccr5/betting-championship-smart-contract.svg?style=for-the-badge
[stars-url]: https://github.com/ccr5/betting-championship-smart-contract/stargazers
[issues-shield]: https://img.shields.io/github/issues/ccr5/betting-championship-smart-contract.svg?style=for-the-badge
[issues-url]: https://github.com/ccr5/betting-championship-smart-contract/issues
[license-shield]: https://img.shields.io/github/license/ccr5/betting-championship-smart-contract.svg?style=for-the-badge
[license-url]: https://github.com/ccr5/betting-championship-smart-contract/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mattnobre
[product-screenshot]: images/home.png
