import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";

const ProfileModal = ({ isOpen, onOpen, onOpenChange }: any) => {
  return (
    <div>
      {/* <Button onPress={onOpen} color="secondary" className="fixed z-[60]">
        Open Modal
      </Button> */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        size="5xl"
        radius="lg"
        classNames={{
          body: "p-0",
          backdrop: "bg-[#000000]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#222222] text-[#919191]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex">
                  <div className="bg-[#181818] p-6 rounded-r-xl border-r-1 border-[#333333] w-[309px] flex-shrink-0">
                    p
                  </div>
                  <div className="p-6">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
