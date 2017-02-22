# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  # Forward server port
  config.vm.network :forwarded_port, host: 4000, guest: 4000, auto_correct: true

  # Provision the development environment
  config.vm.provision :shell, privileged: false, inline: <<-PROVISION
    cd /vagrant

    # Install ruby and it's dependencies
    sudo apt-get update
    sudo apt-get install libgmp3-dev zlib1g-dev build-essential ruby ruby-dev -y

    # Install bundler to manage gems
    sudo gem install bundler

    # Install gem dependencies
    bundle install

    # DONE!
    echo "To start server:"
    echo
    echo "    vagrant ssh"
    echo "    cd /vagrant"
    echo "    bundle exec jekyll serve -H 0.0.0.0"
    echo
    echo "To restart server:"
    echo
    echo "    Press CTRL-C"
    echo "    bundle exec jekyll serve -H 0.0.0.0"
  PROVISION
end

