import { deleteReservation } from "../../api/reservation";
import { fetchRooms, updateRoomData } from "../../api/room";

class ReservationData extends HTMLElement {
  connectedCallback() {
    const roomInfoAttr = this.getAttribute("roomInfo");
    const {
      id,
      roomType = "N/A",
      checkIn = "N/A",
      checkOut = "N/A",
      added = "N/A", // This will be the createdAt value
    } = roomInfoAttr ? JSON.parse(roomInfoAttr) : {};

    const customerInfoAttr = this.getAttribute("customerInfo");
    const {
      name = "Guest",
      gender = "N/A",
      phone = "N/A",
      city = "N/A",
      country = "N/A",
      roomPrice = "N/A"
    } = customerInfoAttr ? JSON.parse(customerInfoAttr) : {};

    this.innerHTML = `
      <div class="bg-white p-5 shadow-md rounded-md">
        <h3 class="font-semibold text-lg">${name}</h3>
        <p class="text-sm text-gray-600 mt-1">Room: ${roomType}</p>
        <p class="text-sm text-gray-600">Check-in: ${checkIn}</p>
        <p class="text-sm text-gray-600">Check-out: ${checkOut}</p>
        <p class="text-sm text-gray-600">Added: ${added}</p>

        <div class="mt-4 flex justify-end gap-2">
          <button class="confirm-btn bg-[#7C6A46] hover:brightness-110 text-white text-sm px-3 py-1 rounded">Confirm</button>
        </div>
      </div>
    `;

    this.querySelector(".confirm-btn").addEventListener("click", async () => {
      const resData = await fetchRooms();
      const allRooms = resData.data.roomsData;
      console.log(allRooms)
      try {

        const suitableEmptyRooms = allRooms.filter(
          (r) => !r.isBooked && r.roomType !== roomType
        );
        console.log(suitableEmptyRooms);
        console.log(allRooms);
        console.log(roomType);
        if (suitableEmptyRooms.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * suitableEmptyRooms.length
          );
          const randomEmptyRoomToAssign = suitableEmptyRooms[randomIndex];
          const roomNoToAssign = randomEmptyRoomToAssign.roomNo;

          const updatePayload = {
            customer: name,
            roomNo: roomNoToAssign,
            roomType,
            roomPrice,
            isBooked: true,
          };

          await updateRoomData(updatePayload, roomNoToAssign);
          console.log(
            `Admin: Room ${roomNoToAssign} assigned to customer ${name}.`
          );

          const deleteResponse = await deleteReservation(id);
          if (deleteResponse.status === "success") {
            this.remove();
          }
        } else {
          console.log(
            "Admin: No suitable empty rooms available for this customer request. Showing modal."
          );
          showAdminNoRoomModal(phone);
        }
      } catch (error) {
        console.error("Admin: Error during room assignment process:", error);
      }
    });

    function showAdminNoRoomModal(customerPhone) {
      const modal = document.getElementById("adminNoRoomModal");
      if (modal) {
        modal.classList.remove("hidden");
        document.getElementById("adminContactCustomerWhatsAppBtn").onclick =
          () => {
            handleAdminContactCustomerWhatsApp(customerPhone);
          };
        document.getElementById("adminCloseModalBtn").onclick =
          hideAdminNoRoomModal;
      }
    }
    function hideAdminNoRoomModal() {
      const modal = document.getElementById("adminNoRoomModal");
      if (modal) {
        modal.classList.add("hidden");
      }
    }

    function handleAdminContactCustomerWhatsApp(customerPhone) {
      console.log("Admin: Contact Customer via WhatsApp action triggered.");

      window.open(
        `https://wa.me/${customerPhone}?text=Regarding your room inquiry, we're sorry cause it's fully booked right now`,
        "_blank"
      );
      hideAdminNoRoomModal();
    }
  }
}

customElements.define("reservation-data", ReservationData);
