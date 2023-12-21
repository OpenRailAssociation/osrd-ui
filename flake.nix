{
  description = "A Nix flake for OSRD icons dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat.url = "https://flakehub.com/f/edolstra/flake-compat/1.tar.gz";
    alejandra = {
      url = "github:kamadorueda/alejandra/3.0.0";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, ... }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [];
        };
        fixedNode = pkgs.nodejs-18_x;
        fixedNodePackages = pkgs.nodePackages.override {
          nodejs = fixedNode;
        };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [ 
            fixedNode 
            fixedNodePackages.npm
            fixedNodePackages.yarn
          ];
        };
      }
    );
}