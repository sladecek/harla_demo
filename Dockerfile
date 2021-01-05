FROM ubuntu
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get install -y \
    build-essential \
    curl \
    emacs-nox \
    git \
    nodejs npm
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc
RUN rustup default nightly
npm install -g truffle
#RUN git clone https://github.com/sladecek/harla_zk
#run cargo build
#copy prover_db.json /harla_zk
#copy legalage /
#soft linky na binaries