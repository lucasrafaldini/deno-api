# Build stage
FROM hayd/debian-deno:1.2.0 AS Builder

EXPOSE 1667

RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get -y install sudo

# RUN useradd -m chupacabra && echo "chupacabra:chupacabra" | chpasswd && adduser chupacabra sudo

USER root

CMD /bin/bash


WORKDIR /app

# RUN deno upgrade

# Caching the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache app.ts

CMD ["run", "--allow-net", "--allow-read", "app.ts"]
