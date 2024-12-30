const express = require("express");
const requestController = require("../controllers/request.controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, requestController.createrequest);
router.get("/get-list", authMiddleware, requestController.getAllRequest);
router.get("/get-mine", authMiddleware, requestController.getMineRequest);
router.patch("/add-quotation", authMiddleware, requestController.updateRequest);
router.patch("/upload-policy", authMiddleware, requestController.uploadPolicy);
router.delete("/delete", authMiddleware, requestController.deleteRequest);
router.get("/get-by-id", authMiddleware, requestController.getRequestById);
router.get("/serach", authMiddleware, requestController.searchByParameter);
router.delete("/delete", authMiddleware, requestController.deleteRequest);
router.patch("/pay-now", authMiddleware, requestController.payForRequestNow);
router.get("/get-activity-point", authMiddleware, requestController.getActivityPoint);
router.patch("/varified-payemnt", authMiddleware, requestController.getPaymentVarified);

router.get("/activity-point-history", authMiddleware, requestController.getActivityPointsHistory);
router.get("/get-request-by-vehicleType", authMiddleware, requestController.getVehicleTypeGraphData);
router.get("/get-status-by-yaer", authMiddleware, requestController.getRequestStatusByYaer);
router.get("/get-stagewise-total-request", authMiddleware, requestController.getTotalByStageWise);



router.get("/states", authMiddleware, requestController.getMyRequestStatus);

module.exports = router;
