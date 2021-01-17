FROM ubuntu
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y  \
    build-essential \
    curl \
    emacs-nox \
    git \
    nodejs npm
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc
RUN $HOME/.cargo/bin/rustup default nightly
RUN git clone https://github.com/sladecek/harla_zk
RUN (cd harla_zk; $HOME/.cargo/bin/cargo build)
ADD legalage /legalage
RUN cp /harla_zk/target/debug/prove /legalage/prover/bin/         
RUN cp /harla_zk/target/debug/certifier-zk /legalage/certifier/bin/             
RUN cp /harla_zk/target/debug/verifier-zk /legalage/verifier/bin/
