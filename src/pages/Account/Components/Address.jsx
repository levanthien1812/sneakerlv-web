import { Button, Chip, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyDialog from "../../../components/UI/Dialog";
import {
  deleteAddress,
  getDistricts,
  getProvinces,
  getWards,
} from "../../../services";
import { useDispatch } from "react-redux";
import { _fetchAddresses } from "../../../store/account";
import AddAddress from "./AddAddress";

function Address({ address }) {
  const dispatch = useDispatch();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchProvinces() {
      const provinces = await getProvinces();
      const _province = provinces.find(
        (p) => (p.province_id = address.address.province)
      );
      setProvince(_province.province_name);
    }
    async function fetchDistricts() {
      const districts = await getDistricts(address.address.province);
      const _district = districts.find(
        (p) => (p.district_id = address.address.district)
      );
      setDistrict(_district.district_name);
    }
    async function fetchWards() {
      const wards = await getWards(address.address.district);
      const _ward = wards.find((p) => (p.ward_id = address.address.ward));
      setWard(_ward.ward_name);
    }
    fetchProvinces();
    fetchDistricts();
    fetchWards();
  }, []);

  const deleteHandler = async () => {
    await deleteAddress(address._id);
    dispatch(_fetchAddresses());
  };

  return (
    <Stack direction="row" justifyContent="space-between" marginTop={2}>
      <Stack alignItems="start">
        <Typography>
          {address.name} | {address.phoneNum}
        </Typography>
        <Typography>{address.address.street}</Typography>
        <Typography>{ward + ", " + district + ", " + province}</Typography>
        {address.isDefault && (
          <Chip label="Default" color="success" size="small" />
        )}
      </Stack>
      <Stack>
        <Stack direction="row" spacing={1}>
          {!address.isDefault && (
            <Button variant="outlined" size="small">
              Set as default
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setIsUpdating(true)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setIsConfirmDelete(true)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      {isConfirmDelete && (
        <MyDialog
          title="Warning"
          message="Are you sure to delete this addresses?"
          onClose={() => setIsConfirmDelete(false)}
          onAccept={deleteHandler}
        />
      )}

      {isUpdating && (
        <AddAddress onClose={() => setIsUpdating(false)} address={address} />
      )}
    </Stack>
  );
}

export default Address;
