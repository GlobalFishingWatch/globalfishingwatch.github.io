# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/wily64"

  # Forward server port
  config.vm.network :forwarded_port, host: 4000, guest: 4000, auto_correct: true

  # Provision the development environment
  config.vm.provision :shell, privileged: true, inline: <<-PROVISION
    cd /vagrant
    sudo apt-get update
    sudo apt-get install libgmp3-dev zlib1g-dev
    sudo gem install bundler
    sudo gem install ffi -v '1.9.14'
    sudo gem install nokogiri -v '1.6.8.1'
    sudo gem install jekyll-coffeescript -v '1.0.1'
    sudo gem install jekyll-seo-tag -v '2.0.0'
    sudo gem install therubyracer -v '0.11.4'
    bundle install 
    bundle exec jekyll serve -H 0.0.0.0
  PROVISION
end

